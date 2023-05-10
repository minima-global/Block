version=$(node getVersion.js)

cd src && zip -r maximize-src-${version}.mds.zip . && mv maximize-src-${version}.mds.zip ../
