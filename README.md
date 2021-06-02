<p align="center">
    <a href="https://webapp.artizanatweb.ro/admin" target="_blank">
        <img src="https://artizanatweb.ro/assets/svgs/webapp-logo.svg" width="400">
    </a>
</p>

## WEBAPP Example
<p>
    Laravel 8 with React.js 17 web application example.<br />
    The Laravel app uses Repository design pattern, API Resource, Form Request Validation and pivot table.
</p>
<p>
    The <b>ReactJS</b> application can be found in <b>/resources/admin/</b>.<br />
    It serves as an example to show that I am accustomed with both programming styles: <b>functional based components</b> with <b>hooks</b> and <b>class based components</b>.<br />
    Global state is managed by <b>Redux</b> and can be found in <b>/resources/admin/js/stores/</b>.
</p>

## Installation

Create database:
<pre>
mysql> create database webappexample;
</pre>
<br />
Copy file .env.example to .env
<pre>
$ cp .env.example .env
</pre>
and edit .env file based on your settings: <br />
- database: DB_USERNAME, DB_PASSWORD <br />
- main user: <b>ADMIN_CREDENTIALS_EMAIL</b>; <b>ADMIN_CREDENTIALS_PASSWD</b> <br />
<br />
<br />
Copy the virtual host file from /debian/ to your apache directory.
<pre>
$ cp -fr debian/webapp.portfolio.localhost.conf /etc/apache2/sites-available/
</pre>
Change file /etc/apache2/sites-available/webapp.portfolio.localhost.conf with your paths.<br />
<br />
Activate the virtual host and reload apache:
<pre>
$ sudo a2ensite webapp.portfolio.localhost.conf
$ sudo systemctl reload apache2
</pre> 
Apache <b>mod_rewrite</b> must be enabled ($ sudo a2enmod rewrite)
<br />
<br />
Add the following line to your <b>/etc/hosts</b>:
<pre>
127.0.1.1	webapp.portfolio.localhost
</pre>
<br />
Install dependencies using composer:
<pre>
$ composer install
</pre>
<br />
Run DB migration:
<pre>
$ php artisan migrate
</pre>
<br />
Create a Password Grant Client:
<pre>
$ php artisan passport:client --password

 What should we name the password grant client? [WEBAPP-Portfolio-Example Password Grant Client]:
 > password

 Which user provider should this client use to retrieve users? [users]:
  [0] users
 > 

Password grant client created successfully.
</pre>
Edit .env with the generated ID and secret:
<pre>
MIX_ADMIN_CLIENT_ID=---Client ID-here---
MIX_ADMIN_CLIENT_SECRET="---Client secret-here---"
</pre>
<br />
Install front-end dependencies:
<pre>
$ npm install
</pre>
<br />
Generate a production build:
<pre>
$ npm run prod
</pre>
