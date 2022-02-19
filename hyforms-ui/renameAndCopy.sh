dirName="$(pwd)/build/static"

echo ""
echo "Moving JavaScript Files"
echo ""

cd $dirName/js
fileName=$( ls *.js | grep "^main*" )
rm ../../../../staticfiles/js/"hy-forms.js"
cp $fileName ../../../../staticfiles/js
cd ../../../../staticfiles/js
mv $fileName "hy-forms.js"
cd -
fileName=$( ls *.js | grep "^runtime*" )
rm ../../../../staticfiles/js/"hy-forms1.js"
cp $fileName ../../../../staticfiles/js
cd ../../../../staticfiles/js
mv $fileName "hy-forms1.js"
cd -
fileName=$( ls *.js | grep "^[0-9]" )
rm ../../../../staticfiles/js/"hy-forms2.js"
cp $fileName ../../../../staticfiles/js
cd ../../../../staticfiles/js
mv $fileName "hy-forms2.js"
cd -

echo ""
echo "Moving CSS Files"
echo ""

cd ..

cd $dirName/css
fileName=$( ls *.css | grep "^main*" )
rm ../../../../staticfiles/css/"hy-forms.css"
cp $fileName ../../../../staticfiles/css
cd ../../../../staticfiles/css
mv $fileName "hy-forms.css"
cd -
fileName=$( ls *.css | grep "^[0-9]" )
rm ../../../../staticfiles/css/"hy-forms1.css"
cp $fileName ../../../../staticfiles/css
cd ../../../../staticfiles/css
mv $fileName "hy-forms1.css"
cd -

echo ""
echo "Moving Image Files"
echo ""
cp $dirName/media/* ../../../../staticfiles/media/