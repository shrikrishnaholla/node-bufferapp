test :
	npm test

install :
	npm install

doc :
	docco lib/*;

coverage:
	jscoverage --no-highlight lib lib-cov;
	NODE_BUFFERAPP_COV=1 mocha -R html-cov tests/ > tests/coverage.html
	rm -rf lib-cov