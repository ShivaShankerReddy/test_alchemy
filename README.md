# TEST Alchemy
---------------

## .env file
-------------

1. PORT: specific port to run the server or 3000 hardcoded as port number
2. TOKEN_KEY: jwt secret key
3. NEWS_API_KEY: news api key
4. WEATHER_API_KEY: weather api key


## API Routes
----------

# **login:**

**url**: **/login**
**method**: **POST**

**req parameters:**
    
    - email: email of the user
    - password: password of the user and it should be greather than 8 characters


**response:**

    - statuscodes:
        - 400: 
            - list of errors
                eg: "errors": [
                    {
                    "msg": "Invalid value",
                    "param": "password",
                    "location": "body"
                    }
                ]
        - 403:
            - Authorization is required to view this page()
        - 401:
            - Invalid Token
        - 500:
            - msg: internal server error
        - 200: 
            - msg: user logged in successfully..!
            - token: jwt token(send either in body req or query for login)


# **logout:**


**url**: **/logout**

**method**: **PUT**

**req parameters**
    
    - token: user token


**response**

    - statuscodes:
        - 403:
            - Authorization is required to view this page()
        - 401:
            - Invalid Token
        - 200: 
            -msg: You have been Logged Out
        - 500:
            - msg: internal server error


# **Signup:**


**url**: **/signup**
**method**: **POST**

**req parameters**

    - email: email of the user
    - password: password of the user and it should be greather than 8 characters
    - name: name of the user


**response**

    - statuscodes:
        - 400: 
            - list of errors
                eg: "errors": [
                    {
                    "msg": "Invalid value",
                    "param": "password",
                    "location": "body"
                    }
                ]
        - 403:
            - Authorization is required to view this page()
        - 401:
            - Invalid Token
        - 200: 
            - msg: user logged in successfully..!
        - 500:
            - msg: internal server error

# **News**


**url**: **/news**
**method**: **POST**

**req parameters**

    -token: user token

** res parameters**

    - statuscodes:
        - 403:
            - Authorization is required to view this page()
        - 401:
            - Invalid Token
        - 200: 
            - data: {
                "count":5,
                data: [
                    {
                        "headline": "Human organs can be stored for three times as long in major breakthrough for transplants",
                        "link": "https://www.telegraph.co.uk/science/2019/09/09/human-organs- can-stored-three-times-long-major-breakthrough/"
                    },
                ]
            }
        - 500:
            - msg: internal server error


# **Weather**


**url**: **/weather**
**method**: **get**

** res parameters**

    - statuscodes:
        - 403:
            - Authorization is required to view this page()
        - 401:
            - Invalid Token
        - 400:
            - error while fetching the data
        - 500:
            - msg: internal server error
        -200:
            - data: {
                "count":5,
                "unit": "metric",
                "location": {
                    lat: 22.22,
                    long: 22.22
                },
                data: [
                    {
                        "date": “Sun March 06 2020”,
                        "main": “Rain”
                        "temp": 293.55
                    },
                ]
            }
