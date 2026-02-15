default: serve

check:
  zola -r site check

serve:
  zola -r site serve -o .public --force
  
build:
  zola -r site build -o build/public --force

commit hint="":
  netero commit {{ hint }} | git commit --edit -F -
