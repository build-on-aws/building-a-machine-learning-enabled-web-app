## My object and text detection app

This repo contains sample app code to accompany [AWS Workshop Studio](workshops.aws/) labs.   
The sample app is an object and text detection app for students on campus.   
Students can upload images that contains real world objects or text, and get the labels for all the detected objects and texts in the image.

There are currently 2 labs in the workshop, and there are 2 corresponding branches in the repo:
1. Main: Analyze an image with Amazon Rekognition
2. Lab 2: Adding a feature to analyze an image with Amazon Textract

### Audience
This is a foundational repo aimed at students who are getting started with machine learning concepts.

### Technology and Services
The app stack:
* Node.js, Vue.js, and Vite
* Visual Studio Code

AWS services including:
* Amazon Rekognition - https://aws.amazon.com/rekognition/
* Amazon Textract - https://aws.amazon.com/textract/
* Amazon Identity and Access Management - https://aws.amazon.com/iam/	

The app requires an AWS account to provision and run:
* If you are attending an AWS Workshop event, this is supplied to you. 
* If you are using this repo outside of an hosted Workshop event, you will need to supply your own AWS account: [Create](https://aws.amazon.com/resources/create-account/) a new account or [sign in](https://aws.amazon.com/console/) to your existing account.

> Warning: The repo provisions AWS services, which incur a cost. While provisioning and briefly running the app as a learning exercise would only incur a relatively small cost, care should be taken to delete the AWS Amplify app and associated services when no longer needed to ensure future charges do not accrue. Instructions on how to delete the app are included at the end of this README

### Prerequisites
The following software is required:
1. [Node.js](https://nodejs.org/en/download) v18.15.0
2. Vue.js v3.2.47
3. Vite.js v4.3.5
4. [Visual Studio Code](https://code.visualstudio.com/download) v1.77

### Installation

1. Create a folder, open your terminal at the newly created folder location. Clone the repo by typing the following command in the terminal -
   
   ```
   git clone -b lab2 https://github.com/build-on-aws/building-a-machine-learning-enabled-web-app.git
   ```

2. Navigate inside the `building-a-machine-learning-enabled-web-app` folder

   ```
   cd building-a-machine-learning-enabled-web-app
   ```

3. Run the following commands to install the Amazon Rekognition and Amazon Textract SDK - 
   
   ```
   npm install
   npm install @aws-sdk/client-rekognition
   npm install @aws-sdk/client-textract
   ```

4. Open the `building-a-machine-learning-enabled-web-app` in Visual Studio Code. Here is how the directory would look -
   
   ![directory](https://github.com/build-on-aws/building-a-machine-learning-enabled-web-app/assets/15520369/37f4d493-a992-46d0-b1bd-edf6598e8a56)


### Credentials

**If in hosted workshop**: 

1. We need to provide the AWS Credentials. The keys can be found on the **Get AWS CLI credentials** sidebar link on the Workshop Studio page.

   ![getcred](https://github.com/build-on-aws/building-a-machine-learning-enabled-web-app/assets/15520369/8cdac684-d695-46a4-90d5-b18965fde3b2)

   > Save these access keys safely with you. We will need it to configure the .env.local file

2. Open the **.env.local** file located in the root folder of `building-a-machine-learning-enabled-web-app`. Add the access keys from the above step into this file - 
   
   <img width="714" alt="env1" src="https://github.com/build-on-aws/building-a-machine-learning-enabled-web-app/assets/15520369/8612eda8-fcd5-4cdf-8014-cac19c166e64">


3. Save the file and close it.


**If supplying your own AWS account**:
1. Proceed to your AWS Portal
2. Search for IAM
3. Click on **Users** located on the left side pane under *Access management*
4. To create a new user, click on **Add users**.
5. Provide a unique username.. Click *Next*
6. Select Attach Policies, and under **Permission policies**, add the following policies bu ticking them - 
   - AmazonRekogntionFullAccess
   - AmazonTextractFullAccess
   
   Click *Next* after selecting the above two policies
7. Click on **Create user** on the Review and create section.
8. Select the newly created user, under the Security credentials tab, click on **Create access key**
9. From the options displayed, select **Other** and click on *Next*
10. No changes required on the *Set description tag - optional* section. Proceed to **Create access key**
11. Copy the Access key and Secret access key.
12. Open the **.env.local** file located in the root folder of `building-a-machine-learning-enabled-web-app`. Add the access keys from the above step into this file - 
   
    <img width="452" alt="envLocal" src="https://github.com/build-on-aws/building-a-machine-learning-enabled-web-app/assets/15520369/0a8ed7bc-bcba-49cc-9a90-29f84752cba7">

13. Save the file and close it.

### Running the app
1. Inside the repo root folder, in the terminal run the following command - 
   
   ```
   npm run dev
   ```

2. Open the localhost website (http://localhost:3000 is the default, link may vary)

3. Accept the terms and condition, Choose a photo.

4. Select 'Analyze with Amazon Rekognition' or 'Analyze with Amazon Textract'. You will see the results below the photo you have uploaded.
### Clean-up

If you attended an instructor-led hosted workshop, you don't need to do the clean-up of services, as the sandbox accounts will be deleted after the end of the event.

But if you have done this workshop independently, please take a moment to clean up your account by deleting the services you no longer need.

As IAM is the only service we manually created, we will delete the user.

- Search and select IAM on the AWS console
- Click on Users
- Select `<your-user-to-be-deleted>`
- Click on Delete

---

## Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more information.

## License

This library is licensed under the MIT-0 License. See the LICENSE file.

