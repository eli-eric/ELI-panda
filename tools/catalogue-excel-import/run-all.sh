#!/bin/sh

for FILE in import-data/*; do ./catalogue-excel-import $FILE; echo;echo; done

echo "Done"