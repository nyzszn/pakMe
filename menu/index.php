<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>CSS Expanding Hamburger Menu Demo</title>
<style>
html { height: 100%; }

html, * {
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Roboto', cursive;
  text-align: center;
  color: #45565E;
}

a {
  color: #f7f7f7;
  padding: 0.3em;
  border-radius: 5px;
  text-decoration: none;
}

.checkbox-container {
  display: block;
  float: left;
  width: 50px;
  height: 50px;
  position: relative;
  background: #000000;
}

.checkbox-trigger {
  opacity: 0;
  position: absolute;
  width: 50px;
  height: 50px;
  left: 0px !important;
  cursor: pointer;
  z-index: 5;
}

.hamburger-menu, .hamburger-menu::before, .hamburger-menu::after {
  display: block;
  position: absolute;
  background: white;
  width: 40px;
  height: 4px;
  margin: 1.3em 3em;
  transition: background 0.3s;
}

.hamburger-menu::before, .hamburger-menu::after {
  content: '';
  position: absolute;
  margin: -0.7em 0 0;
  transition: width 0.7s ease 0.3s, transform 0.7s ease 0.3s;
}

.hamburger-menu::after { margin-top: 0.7em; }

.hamburger-menu {
  display: block;
  margin: 0;
  position:absolute;
  left:0;
  margin-top: 1.45em;
  margin-right: 0.35em;
  margin-left: 0.35em;
  margin-bottom: 1.45em;
  transition: width 0.3s ease;
}

.checkbox-trigger:checked { left: 202px; }

.checkbox-trigger:checked + .menu-content .hamburger-menu {
  width: 2em;
  transition: width 0.7s ease 0.7s;
}

.checkbox-trigger:checked + .menu-content .hamburger-menu::before {
  width: 1.2em;
  transform: rotate(-35deg);
  margin-top: -0.4em;
}

.checkbox-trigger:checked + .menu-content .hamburger-menu::after {
  width: 1.2em;
  transform: rotate(35deg);
  margin-top: 0.4em;
}

.checkbox-trigger:checked + .menu-content ul {
  width: 200px;
  height: 200px;
  transition: width 0.7s ease 0.3s, height 0.3s ease;
}

.menu-content {
  display: flex;
  background: #000000;
  color: #fff;
  float: left;
}

.menu-content ul {
  display: block;
  padding-left: 0;
  padding-top: 1em;
  padding-bottom: 1em;
  margin: 0;
  width: 0px;
  height: 0px;
  overflow: hidden;
  transition: height 0.3s ease 0.7s, width 0.7s ease;
}

.menu-content ul li {
  list-style: none;
  padding-top: 1em;
  padding-bottom: 1em;
  font-weight: bold;
  text-transform:uppercase;
  cursor: pointer;
  transition: color 0.5s, background 0.5s;
}

.menu-content ul li:hover {
  color: #ffffff;
  background: #000000;
}
h1 { color:#fff; padding:70px 0;}
</style>
</head>

<body>
<span class="checkbox-container">
<input class="checkbox-trigger" type="checkbox"  />
<span class="menu-content">
<ul>
  <li><a href="./menu/login.php">Login</a></li>
  <li><a href="./menu/Register.php">Register</a></li>
  <li><a href="./menu/contactus.html">ContactUs</a></li>
  <li><a href="./menu/aboutus.html">AboutUs</a></li>
</ul>
<span class="hamburger-menu"></span> </span> </span>
<div class="css-script-ads" align="center">

<script type="text/javascript"
src="http://pagead2.googlesyndication.com/pagead/show_ads.js">
</script></div>
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-46156385-1', 'cssscript.com');
  ga('send', 'pageview');

</script>
</body>
</html>