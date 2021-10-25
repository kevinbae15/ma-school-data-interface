# ma-school-data-interface
> Full stack application that provides information on schools from MA


## Setup (Backend)

> Make sure you are in the `/backend` directory to run the backend server

### Setup virtual environment

```
python3 -m venv dev
. dev/bin/activate
pip3 install -r requirements.txt
```

### Start

```
python3 manage.py runserver <port_number>
```

## Endpoints
- GET  `/api/schools`
- GET  `/api/schools/<school_id>`


### GET `/api/schools`

Parameters (taken in by query string):
```
sort: keyword to sort by
sortType: either 'asc' or 'desc'
count: number of results to return
page: return results from specific page number based on count
```

Success Response Example:

Request: `/api/schools?sort=INSTNM&sortType=asc&count=5&page=1`

```
{
    "status": "success",
    "data": {
        "schools": [
            {
                "UNITID": 135,
                "INSTNM": "Worcester State University",
                "ADM_RATE": "0.6857",
                "SAT_AVG": "1020"
            },
            {
                "UNITID": 134,
                "INSTNM": "Worcester Polytechnic Institute",
                "ADM_RATE": "0.4855",
                "SAT_AVG": "NULL"
            },
            {
                "UNITID": 133,
                "INSTNM": "Williams College",
                "ADM_RATE": "0.1761",
                "SAT_AVG": "1442"
            },
            {
                "UNITID": 80,
                "INSTNM": "William James College",
                "ADM_RATE": "NULL",
                "SAT_AVG": "NULL"
            },
            {
                "UNITID": 132,
                "INSTNM": "Wheelock College",
                "ADM_RATE": "0.9542",
                "SAT_AVG": "944"
            }
        ],
        "numberOfPages": 39
    }
}
```

> the endpoint returns number of pages to let frontend know how many pages to display


Fail Response Example:

```
{
    "status": "fail",
    "errorMessage": "invalid sort by keyword"
}
```

### GET `/api/schools/<school_id>`

> The only parameter is the school_id, which is passed as a parameter in the url

Success Response Example:

Request: `/api/schools/12`

```
{
    "status": "success",
    "data": {
        "CITY": "Longmeadow",
        "STABBR": "MA",
        "ADM_RATE": "0.7726",
        "ZIP": "01106",
        "HIGHDEG": "4",
        "LOCALE": "21",
        "PROGRAMS": [
            "CIP22BACHL",
            "CIP22CERT1",
            "CIP22ASSOC",
            "CIP13BACHL",
            "CIP26BACHL",
            "CIP30BACHL"
        ],
        "SAT_AVG": "NULL",
        "LONGITUDE": "-72.583974",
        "INSTNM": "Bay Path University",
        "LATITUDE": "42.055364",
        "CCSIZSET": "11",
        "INSTURL": "www.baypath.edu",
        "UNITID": 12
    }
}
```


## Setup (Frontend)

### Installation 

Install node packages while in the repository's directory

```
npm install  
```

## Start Server

> Make sure you are in the `/frontend` directory to run webpack

Start the server with: 
```
webpack-dev-server
```

> You may need to install webpack-dev-server 

```
npm i -g webpack-dev-server
```

## Features

This app supports:
 * sorting (both descending and ascending) and pagination by clicking on the headers
 * pagination which allows users to digest the information easier
 * a modal containing additional info about the school once its row is clicked

Potential additional features/handling:
 * Ease of School Search:
   * Allow filtering:
      * by school info (size, locale, etc)
      * by scores (a range of SAT Scores and Acceptance Rates)
      * by programs available
   * Allow search by school
   * Allow users to choose how many schools are shown on the table

 * Better UI/UX 
    * indiciation of sorting direction on table headers
    * Better error handling on the frontend
    * make school information on modal more digestable
    * interface is black and white, could use more colors for better UX

 * Optimizations
    * Cache dataset to save time on redundant calls
    * Store single school information on the frontend to prevent multiple calls to same school
