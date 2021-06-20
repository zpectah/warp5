# Warp5

**!!! In development -- In development -- In development -- In development !!!**

## Description
Content Managing System with multiple languages for easy management basic web presentation, blog or e-shop.

## Requirements
* Must be installed globally on machine:
	- Node.js (NPM) or YARN
	- Gulp CLI
* PHP and Composer (For Windows may be different stack)
* Apache Server with MySQL database. Prefer (XAMP / MAMP / LAMP / ...)

## Dependencies
* JavaScript:
	- TypeScript
	- Babel
	- React
	- styled-components ()
	- JSS (https://cssinjs.org/styled-jss?v=v2.2.3)
	- Redux
	- i18n
	- lodash
	- moment.js
	- ...more
* PHP 7+:
	- bladeone (https://github.com/EFTEC/BladeOne)
	- php-image-resize (https://github.com/gumlet/php-image-resize)
	- mysqldump-php (https://github.com/ifsnop/mysqldump-php)
* Styles:
	- Sass/SCSS

## Development configuration
### Server
#### Virtual Host
```
<VirtualHost *:80>
    DocumentRoot "/path-to-project-root/warp5/dev/"
    ServerName warp5
    ServerAlias warp5
</VirtualHost>

<VirtualHost *:80>
    DocumentRoot "/path-to-project-root/warp5/test/"
    ServerName test.warp5
    ServerAlias test.warp5
</VirtualHost>
```
#### Hosts
```
127.0.0.1		warp5
127.0.0.1		test.warp5
```

### Description
- If you config correctly and open your browser with ``http://warp5/`` or ``http://test.warp5/`` you will see current build
- Configuration paths may be different for Windows or Unix system users

## Development tasks
### Install
- ``% yarn install`` - Install node packages
- ``% yarn initial`` - Prepare vendors

### Watch
- ``% yarn start`` - Watching changes for whole project
- ``% yarn start:admin`` - Watching changes for **admin/** and backend files
- ``% yarn start:web`` - Watching changes for **web/**

### Build
- ``% yarn dev`` - Create development bundle
- ``% yarn test`` - Create test bundle
- ``% yarn build`` - Create production bundle

## Environment directories

Location | Description
--- | ---
``src/`` | Source directory
``dev/`` | Development directory
``test/`` | Test directory - prepared for test
``prod/`` | Production directory - prepared for deploy

## File structure

Location | Description
--- | ---
``src/admin/`` | Root Admin directory
``src/api/`` | Root Api directory
``src/web/`` | Root Web directory
``src/config/`` | Config files
``src/core/`` | PHP Core files
``src/libs/`` | Extended libraries (Only for imports)
``src/static/`` | Static files (images or whatever)
``src/vendor/`` | Vendor directory (Composer)
``$/uploads/`` | Uploaded files from system
``$/logs/`` | Log files, if any

## Configuration and Options files

Name | Type | Location | Rebuild | Description
--- | --- | --- | --- | ---
Config | Admin | ``src/admin/scripts/config.js`` | true | Config file imports
Constants | Admin | ``src/admin/scripts/constants.ts`` | true | JavaScript Constants
Constants | Backend | ``src/config/constants.php`` | true | PHP Constants
Database | Backend | ``src/config/database.php`` | true | Configuration for Backend databases
Global | All | ``src/config/global.json`` | true | Global configuration file
Environment | All | ``src/config/environmental.json`` | true | Configuration by environment
Options | All | ``src/config/options.json`` | true | Project options object
Locales | All | ``src/config/locales.json`` | true | Locale options object
Numbers | All | ``src/config/nums.json`` | true | ...


## Api paths
- See ``./api.md`` file for more info
