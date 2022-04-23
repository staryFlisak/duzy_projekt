# Big project REST API
+ Base URL
+ Account
    - login
    - logout
    - delete
+ Parents
    - get list of parents
    - get parent
    - delete parent
    - register parent
    - edit parent
+ Sons
    - get list of sons
    - get son
    - delete son
    - register son
    - edit son
+ Chat-messages
    - post message
---
## Base URL

For now the base URL is: `http://localhost:3000`

---
## Account
>### login
>+ Endpoint: `POST {BASE_URL}/login`
>
>+ Description: User has to be logged it to be able to get the data when making most of the API requests.
>+ #### Parameters:
>
>| Parameter | Required/Optional | Description |
>| --------- | ----------------- | ----------- |
>| `username` | Required | This should be the user email which is stored in the database |
>| `password` | Required | This should be the user password which is stored in the database |

>### logout
>+ Endpoint: `GET {BASE_URL}/logout`
>
>+ Description: User can be loged out any time. No parameters are required.
>+ #### Parameters: `no parameters required`

>### delete
>+ Endpoint: `DELETE {BASE_URL}/:id`
>
>+ Description: User can delete his account any time. No parameter are required.
>+ #### Parameters: `no parameters required`