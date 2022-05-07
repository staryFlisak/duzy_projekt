# Big project REST API
+ Base URL
+ Account
    - login
    - logout
    - delete
+ Parents
    - get list of parents
    - get parent
    - register parent
    - edit parent
+ Sons
    - get list of sons
    - get son
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
>+ Description: User has to be logged it to be able to get the data when making most of the API requests.
>+ Parameters:
>
>| Parameter | Required/Optional | Description |
>| --------- | ----------------- | ----------- |
>| `username` | Required | This should be the user email which is stored in the database |
>| `password` | Required | This should be the user password which is stored in the database |

>### logout
>+ Endpoint: `GET {BASE_URL}/logout`
>+ Description: User can be loged out any time. No parameters are required.
>+ Parameters: `no parameters required`

>### delete
>+ Endpoint: `DELETE {BASE_URL}/:id`
>+ Description: User can delete his account any time. No parameter are required.
>+ Parameters: `no parameters required`

---
## Parents
>### get list of parents
>+ Endpoint: `GET {BASE_URL}/parents`
>+ Description: Get the list of the parents from some city. Filter by parents who are looking for a son with particular age
>
>| Parameter | Required/Optional | Description |
>| --------- | ----------------- | ----------- |
>| `sonAgeMin` | Optional | Min Age of the son that parent is looking for |
>| `sonAgeMax` | Optional | Max age of son that parent is looking for|
>| `city` | Optional | Name of the city from the list of cities |

>### get parent
>+ Endpoint: `GET {BASE_URL}/parents/:id`
>+ Description: Get parent profile cart
>+ Parameters: `only the id from the URI`

>### register parent
>+ Endpoint: `POST {BASE_URL}/parents/register`
>+ Description: Create new parent account
>
>| Parameter | Required/Optional | Description |
>| --------- | ----------------- | ----------- |
>| `email` | Required | Email address which is also the login |
>| `password` | Required | Just password |
>| `phone` | Required | Phone number for the verification |
>| `name` | Required | First name and surname as one string |
>| `job` | Optional | One job from the list of jobs |
>| `hobbies` | Optional |  List of hobbies for the list of hobbies |
>| `address` | Optional | Only the city name from the predefined list of cities |
>| `sonAgeMin` | Optional | Min age of the son which parent is looking for |
>| `sonAgeMax` | Optional | Max age of the son which parent is looking for |
>| `doughters` | Optional | List of doughters containg only social media links |

>### edit parent
>+ Endpoint: `PUT {BASE_URL}/parents/edit/:id`
>+ Description: Edit parent account wit the id from the URI
>
>| Parameter | Required/Optional | Description |
>| --------- | ----------------- | ----------- |
>| `phone` | Optional | Phone number for the verification |
>| `name` | Optional | First name |
>| `job` | Optional | One job from the list of jobs |
>| `hobbies` | Optional |  List of hobbies for the list of hobbies |
>| `address` | Optional | Only the city name from the predefined list of cities |
>| `sonAgeMin` | Optional | Min age of the son which parent is looking for |
>| `sonAgeMax` | Optional | Max age of the son which parent is looking for |
>| `doughters` | Optional | List of doughters containg only social media links |

---
## Sons
>### get list of sons
>+ Endpoint: `GET {BASE_URL}/sons`
>+ Description: Get the list of the sons from some city. Filter by min age and max age
>
>| Parameter | Required/Optional | Description |
>| --------- | ----------------- | ----------- |
>| `ageMin` | Optional | Min Age of the son that parent is looking for |
>| `ageMax` | Optional | Max age of son that parent is looking for|
>| `city` | Optional | Name of the city from the list of cities |

>### get son
>+ Endpoint: `GET {BASE_URL}/sons/:id`
>+ Description: Get son profile cart
>+ Parameters: `only the id from the URI`

>### register son
>+ Endpoint: `POST {BASE_URL}/sons/register`
>+ Description: Create new son account
>
>| Parameter | Required/Optional | Description |
>| --------- | ----------------- | ----------- |
>| `email` | Required | Email address which is also the login |
>| `password` | Required | Just password |
>| `phone` | Required | Phone number for the verification |
>| `name` | Required | First name |
>| `dateOfBirth` | Required | YYYY-MM-DD |
>| `aboutYou` | Optional | 500 chars about Anything |
>| `images` | Optional | son pictures |
>| `job` | Optional | This parameter is more complicated than the parents jobs. It's the job object |
>| `education` | Optional | last finished school from the list of schools |
>| `organizations` | Optional | List of organizations to which the son belongs to |
>| `hobbies` | Optional |  List of hobbies for the list of hobbies |
>| `address` | Optional | Only the city name from the predefined list of cities |
>| `socialMedia` | Optional | List of social medial objects. The same objects which are used for doughters

>### edit son
>+ Endpoint: `PUT {BASE_URL}/sons/:id`
>+ Description: Edit son account with the id ffrom the URI
>
>| Parameter | Required/Optional | Description |
>| --------- | ----------------- | ----------- |
>| `phone` | Optional | Phone number for the verification |
>| `name` | Optional | First name |
>| `dateOfBirth` | Optional | YYYY-MM-DD |
>| `aboutYou` | Optional | 500 chars about Anything |
>| `images` | Optional | son pictures |
>| `job` | Optional | This parameter is more complicated than the parents jobs. It's the job object |
>| `education` | Optional | last finished school from the list of schools |
>| `organizations` | Optional | List of organizations to which the son belongs to |
>| `hobbies` | Optional |  List of hobbies for the list of hobbies |
>| `address` | Optional | Only the city name from the predefined list of cities |
>| `socialMedia` | Optional | List of social medial objects. The same objects which are used for doughters

## Chat-messages
>### post message