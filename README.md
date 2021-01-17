# Trawaler Phishing Website Detection

This literaly detect Phishing websites using Machine Learning and automaticaly warn it to user.

### How it Works?

> Extension detect all URLs browsing by user and check is they ar in white list. If not, extension send requet to the flask server and waiting for the server response.

> Flask server capture POST request URLs and predict whether is it Phishing or not with trained ML Model and send result back to the client.

> Extension catch the response from server and, if it is Phishing URL, extention load phishing warning. Also it allows to users to create white list.


#### This work with most of all the websites.
#### This support English and Sinhala Languages.

> Chrome website with English Language.

![Chrome website with English Language.](https://i.postimg.cc/k5XXLwDQ/Chrome-english.gif)

> Microsoft Edge  with Sinhala Language.

![Microsoft Edge  with Sinhala Language.](https://i.postimg.cc/g0SkpR6f/Edge-sinhala.gif)

### What languages used?

Basicaly here used two languages,

- ` Python ` - for building ML Model and Server Backend
- ` JavaScript ` - for Chrome Extension

### What inside the Code?

This contain with three major parts,

- Phishing URLs Detecion Machine Learning Model
- Server Side Backend for serve Extension Request
- Chrome Extension in Client Side
  
### Building Machine Learning Model

Used Libraries -

||||
| --- | --- | --- |
| tensorflow | numpy | pandas |
| urllib | re | ipaddress |
| bs4 | whois | request |
| datetime | request | sklearn |
| matplotlib | keras |  |


- [Data downloading and creating Comma Seperated Value(.csv) Files](Constructing_ML_Model/1_Creating_URL.ipynb)

- [Data Cleaning and Feature Extraction of ` Phishing URLs `](Constructing_ML_Model/2_Feature_Extraction_of_Phishing_URL.ipynb)

- [Data Cleaning and Feature Extraction of ` Legitimate URLs `](Constructing_ML_Model/3_Feature_Extraction_of_Legitimate_URL.ipynb)

- [Creating Final Dataset and save in to Comma Seperated Value(.csv) Files](Constructing_ML_Model/4_Creating_Final_Dataset.ipynb)

- [Finding Best Machine Learining Model based on score](Constructing_ML_Model/5_Finding_Best_Model.ipynb)

- [Train best Machine Learning Model](Constructing_ML_Model/6_Training_selected_best_model.ipynb)


### Backend Server (Flask Server)

Used Libraries -

||||
| --- | --- | --- |
| urllib | ipaddress | re |
| bs4 | whois | urllib |
| datetime | requests | flask |
| feature | tensorflow | numpy |

- [Request Handler](Server/app.py)
- [URL Checker](Server/feature.py)

### Trawler Browser Extension

- [Extension](Extension)


### Resources

Feature Extraction Resource -
[Phishing-Website-Detection-by-Machine-Learning-Techniques](https://github.com/shreyagopal/Phishing-Website-Detection-by-Machine-Learning-Techniques)

