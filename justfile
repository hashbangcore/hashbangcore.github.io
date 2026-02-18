default: serve

check:
  zola -r site check

serve:
  rm -f site/static/giallo-light.css site/static/giallo-dark.css
  zola -r site serve --drafts -o .public --force
  
build:
  rm -f site/static/giallo-light.css site/static/giallo-dark.css
  zola -r site build -o build/public --force

commit hint="":
  netero commit {{ hint }} | git commit --edit -F -
