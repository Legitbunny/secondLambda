
# Second Lambda - Generates Invoice

A brief description of what this project does and who it's for

•	Constructs an economicFields object from the event data, including customer and order details.
•	Defines the URL for the E-conomic REST API endpoint and the options for the HTTP request, including the method, headers, and body.
•	Attempts to fetch all customer data from E-conomic to check if the customer already exists.
•	Filters the fetched customer data by email to check if the customer exists.
•	If the customer does not exist, it creates a new customer in E-conomic.
•	Fetches all product data from E-conomic to match the products in the order.
•	If the products do not exist, it creates new products in E-conomic.
•	Constructs an invoiceFields object for creating a new invoice in E-conomic, including invoice details.
•	Attempts to create a new invoice in E-conomic with the constructed invoiceFields.

## Run Locally

Clone the project

```bash
  git clone https://github.com/Legitbunny/secondLambda.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the serverless locally

```bash
  serverless invoke local --stage dev -f secondLambda
```


## Tech Stack

**Client:** REST APIs, AWS Lambda, IAM, Cloudwatch

**Server:** Node, Express, serveerless, aws sdk


## Lessons Learned

What did you learn while building this project? What challenges did you face and how did you overcome them?


## Documentation

[Documentation](https://docs.google.com/document/d/1w38gCivk-Pk0VLKr5oSCHEuT3TW3Ny41/edit?usp=sharing&ouid=106008763205918033358&rtpof=true&sd=true)

