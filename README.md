# rdf-server
Node.js server for querying multiple RDF graphs: the WordNet interlingual index (ILI), Dutch FrameNet and Dutch WordNet.

## Setting up your own RDF server for ILI, DFN and DWN

Below is a list of steps tested on Ubuntu 18.04. The exact commands might differ on other OS-s, or for different preferences of installation. 

1. run `sh setup.sh` to download the ILI index in the `data` directory
2. install Virtuoso: `sudo apt-get install virtuoso-opensource`
3. add your data location to `DirsAllowed` in `virtuoso.ini` and add a `DefaultGraph`. Then make sure to restart the virtuoso instance: by running `sudo systemctl status virtuoso-opensource-6.1.service` or a similar command.
4. update the paths in the files `server.js`, `commands/*.txt` and `reload.sh` to correspond to your local setup
5. run `sh reload.sh` to load your current RDF files
6. run `nodejs server.js` to start the server on port 3333 - ideally set this up as a service and/or with PM2 process manager.

*Note:* The reload is currently done manually - perhaps set up a cron-like job to clone it manually.
