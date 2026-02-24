default: serve

check:
  zola -r site check

serve:
  zola -r site serve --drafts -o .public --force
  
build:
  zola -r site build -o public --drafts --force

commit hint="":
  netero commit -c docs/convention.txt {{ hint }} | git commit --edit -F -

error:
  just serve > error.txt 2>&1
