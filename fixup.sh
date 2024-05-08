cp dist/mjs/src/index.d.ts dist

rm -rf dist/*/src/index.d.ts

cat >dist/cjs/package.json <<!EOF
{
    "type": "commonjs"
}
!EOF

cat >dist/mjs/package.json <<!EOF
{
    "type": "module"
}
!EOF