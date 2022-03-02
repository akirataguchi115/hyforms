# HYForms

A lot of people need to collect data for various reasons. People often resort to public cloud solutions like google forms or Microsoft forms to collect data, which is fine, but what if the data was strictly confidential and critical, and they do not want it to be in a public cloud? What if there was an open source data collecting platform, which anyone could establish on their own servers and collect data, while storing on their own servers? By research and experience, I have found out that most big corporate businesses like Accenture and Deloitte often do not use any public cloud, but their own proprietary code. While they have the capital to establish such a service and maintain it, what about a startup who wants to collect data, but want it to be confidential in their own servers? Or maybe a researcher wanting to collect sensitive data, but not wanting it to be on the cloud out there. I present my own, open source data collecting platform which everyone is free to review, download and use them for their purposes.


Although this kicked off as an idea for my full stack web development project in my 2nd semester of my masters at Helsingin Yliopisto (hence the name HYForms), I want this to be much bigger than just a project. I would want this to grow in the opensource world. I envision this to have a community, deploying this solution on their servers to collect information or use it as they please.

### To run the django server, first create the environment like so:

- Make sure you have python3 installed. This project was created using 3.9.2
- Next two steps are optional. If the optional steps are done, it will create an isolated environment with the packages and versions as specified in `requirements.txt`. If this is not done, the required packages might conflict with your existing packages. This is recommended, but not required.
- (Optional) Create a virtual environment using `python3 -m pip install virtualenv`
- (Optional) Activate your virtualenv. For linux/mac: `source [virtual_env_name]/bin/activate`
- Install required dependencies using pip. The required libraries are in requirements.txt, so: `pip install -r requirements.txt`

### Run the django server:
- Migrate the DB by running `python manage.py makemigrations` and then `python manage.py migrate` (Otherwise login will fail)
- In the root folder, run `python manage.py runserver`

### For accessing the UI:
- Make sure you have node installed.
- Go to `hyforms-ui` present in the root directory
- Run `npm install` to install the node packages.
- Run `npm start` to run the UI 

### Number of hours dedicated:

| Task                                                    | Hours  |
| ------------------------------------------------------- | ------ |
| Learning React                                          | 10     |
| Learning Django                                         | 7      |
| Learning REST API implementation                        | 5      |
| Homepage, User auth                                     | 5      |
| Creating application design*                            | 25     |
| Creating forms                                          | 23     |
| Merging Django and React                                | 15     |
| Saving forms, public concept                            | 15     |
| Editing Forms                                           | 20     |
| Form Fillup and saving data                             | 20     |
| Viewing Responses                                       | 15     |
| Final cleanup, bug fixing, putting things into context  | 15     |
| Total                                                   | 175    |

\*There were time when I thought of an implementation, tried it out, and in between I realised that it is not possible, so I had to scrape it off and start afresh with a different concept.