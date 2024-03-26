
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

---

During the development of this project, I embarked on a journey to expand my knowledge and skills in AWS Lambda functions, an area I had previously only been familiar with through basic concepts. Initially, my plan was to directly write the code within the AWS Lambda console to integrate two backends. However, I quickly realized that this approach was not feasible without utilizing AWS EventBridge, which is essential for handling webhook notifications.

The first challenge I faced was the need to create a separate backend using Node.js and Express to listen for webhook notifications whenever a new product or order was created. This required a significant shift in my initial approach, as I had to learn and implement a new technology stack.

To overcome this challenge, I invested time in learning Node.js and Express, which were new to me. I also had to familiarize myself with the AWS SDK and Serverless Framework, tools that are crucial for running and deploying AWS Lambda functions. This learning process was both challenging and rewarding, as it allowed me to deepen my understanding of cloud computing and serverless architecture.

Another challenge was the integration of the two backends. I had to ensure that the data flow between the two systems was seamless and efficient. This involved careful planning and testing to ensure that the webhook notifications were correctly processed and that the data was accurately transferred between the systems.

In summary, this project was a valuable learning experience that allowed me to expand my technical skills and gain hands-on experience with AWS Lambda functions, Node.js, Express, and serverless architecture. The challenges I faced were significant, but overcoming them not only enhanced my understanding of these technologies but also equipped me with valuable problem-solving skills that I can apply to future projects.

---

## Documentation

[Documentation](https://docs.google.com/document/d/1w38gCivk-Pk0VLKr5oSCHEuT3TW3Ny41/edit?usp=sharing&ouid=106008763205918033358&rtpof=true&sd=true)

