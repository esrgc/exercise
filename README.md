exercise
========

Salisbury University Exercise Routes Application

If running this repository locally, navigate to your exercise folder and start nginx. A web server is needed to serve the JSON files. 



(In Mac) once installing NGINX, navigate to:

/usr/local/etc/nginx/ 

via Terminal and type:

vim nginx.conf

to take you into the NGINX configuration file. Within it, under the server section, add the following block:

	location /exercise/ {
        try_files $uri $uri/view/index.html;
    }

This will, upon typing the http://localhost:8080/exercise/, have NGINX open the proper HTML file and start the application. This is assuming you're running a local copy - the URL will vary depending on how NGINX was set up and whether it's local or not, but the format will be similar.