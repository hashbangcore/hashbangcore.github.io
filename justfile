default: serve

check:
  zola -r site check

serve:
  zola -r site serve --drafts -o .public --force
  
build:
  zola -r site build -o docs --force

commit hint="":
  netero commit {{ hint }} | git commit --edit -F -

error:
  just serve > error.txt 2>&1
