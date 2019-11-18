commands_dir="/import/cltl/tmp/semweb/rdf-server/commands"

cd data/ili
git pull
cd /usr/bin/
for commands_file in "$commands_dir"/*
do
	echo "Loading data from $commands_file"
	./isql-vt localhost:1111 dba filip $commands_file
done
