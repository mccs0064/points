# Points Tax Report
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting started



### Run backend
go to [https://github.com/Points/interview-test-server](https://github.com/Points/interview-test-server) for instructions on how to bring up the backend. 

The frontend app has a .env file with the local baseUrl for the backend.

### Install dependencies 
`npm install`

### Run Application
`npm start` 
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Future Improvements/Enhancements

### Code quality
I would have loved to have spent more time improving the code quality and structure. 
The components are too large and are not single focused. I would have loved to separate out the components into smaller concise components.  This will improve reusability and allow us to build UI's via composition. 

Using bootstrap as a css framework provides alot of bloat. This was used for speed. But the down side is usually alot of nested divs with odd classnames.  

Testing could definitely be improved.  I have tested the service level functions of the app to ensure the correct business logic has been developed. But individual components could be tested for how they handle ui interactions. Things such as loading states, error states, and input verification. 

### UX 
Error handling has been accomplished, but it could be refined.  It would be great if a user got a specific effort instead of a standard error message. As well as actually displaying that error state to the user could look nicer. 

One thing I noticed is the api sends the same results given the same inputs. But it is also unreliable as it throws errors intermittently.  One idea I would have loved to explore was to cache the results(local storage) of a successful api request. This way I could look to the cache the next time the user makes a request. Due to the simple nature of the request the responses could be stored in a simple object data structure. Where the key of the object is the year(as a string) and the value is the response from the api. 

```
{
  "2019" : {responseObj},
  "2020" : {responseObj}
}
```
This approach would allow us to lookup response in O(1).
Of course the downside to this is that if any information has been updated on the backend our user will not see it if that response has been cached. 
We could clear the cache at a given interval or on new page load. 

Accessibility. I have not designed or tested for accessibility.  This is something that is required if this was a real app.  I did utilize some semantic html but I am sure there is alot of room for growth here. 

### Design
Overall design is not very good. I used bootstrap for speed and efficiency. 

