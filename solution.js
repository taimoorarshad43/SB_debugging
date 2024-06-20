const accounts = [
	{id: 1, owner: "Alice", balance: 500},
	{id: 2, owner: "Bob", balance: 300}
];

function getAccountById (id)
{
	for (const account of accounts)
	{
		if (account.id == id)
		{
			return account;
		}
	}
}

//TODO:
//Needs to handle empty account info and invalid account information
//Needs to handle dupicate account info
function createAccount (newAccountId, newAccountOwner)
{
	if(newAccountId === undefined || newAccountOwner === undefined){
		throw new Error("You need to specify an new account ID and a new Owner.");
	}
	if(newAccountId <= 0 || Number.isInteger(newAccountId) === false || typeof newAccountOwner !== "string" || newAccountOwner.trim().length === 0){
		throw new Error("Account ID must be a positive integer and new Owner must be a valid string");
	}

	//Checking to see if inputted ID already exists
	let duplicate = getAccountById(newAccountId);
	if(duplicate !== undefined){
		throw new Error("Account ID already exists!");
	}
	
	try{
		accounts.push(
			{
				id: newAccountId,
				owner: newAccountOwner,
				balance: 0 //This should be a number
			}
		);
	}catch(err){
		console.log(err.message);
	}
}

function depositMoney (accountId, amount)
{
	if(accountId === undefined || amount <= 0 || amount === Infinity 
	|| accountId <= 0 || Number.isInteger(accountId) === false || Number.isInteger(amount) === false){
		throw new Error("You need to specify an valid account ID and/or a positive deposit amount.");
	}

	const account = getAccountById(accountId);

	if (!account)
	{
		throw new Error("Account not found");
	}

	account.balance += amount;
}

function withdrawMoney (accountId, amount)
{
	if(accountId === undefined || amount <= 0 || amount === Infinity
	|| accountId <= 0 || Number.isInteger(accountId) === false || Number.isInteger(amount) === false)
	{
		throw new Error("You need to specify an valid account ID and/or a positive withdrawal amount.");
	}
	const account = getAccountById(accountId);

	if (!account)
	{
		throw new Error("Account not found.");
	}

	if (!Number.isFinite(amount))
	{
		throw new Error("Invalid value for withdrawal amount: The amount must be a finite number.");
	}

	if(amount > account.balance){
		throw new Error("You cannot withdraw this amount!");
	}

	account.balance -= amount;
}

function transferMoney (fromAccountId, toAccountId, amount)
{
	const fromAccount = getAccountById(fromAccountId);
	const toAccount = getAccountById(toAccountId);

	if (!fromAccount)
	{
		throw new Error("Source account not found.");
	}

	if (!toAccount)
	{
		throw new Error("Target account not found.");
	}

	if (!Number.isFinite(amount) || amount < 0)
	{
		throw new Error("Invalid value for transfer amount: The amount must be a positive finite number.");
	}

	if(fromAccount.balance - amount < 0){
		throw new Error("You cannot transfer this amount!");
	}

	toAccount.balance += amount;
}

/*
Hints:

getAccountById("1");

createAccount(1, "Alice");
createAccount("3", "Charlie");
createAccount(-3, "Charlie");
createAccount(3, ["Charlie"]);
createAccount(3, "");
createAccount(3, "  ");

depositMoney(1, "300")
depositMoney(1, -300)
depositMoney(1, 0)
depositMoney(1, Infinity)
depositMoney(4, 100)

withdrawMoney(1, -100)
withdrawMoney(1, 0)
withdrawMoney(1, 501)

transferMoney(1, 4, 100)
transferMoney(1, 2, 501);
transferMoney(1, 2, 100);
*/
