#cd ~/Desktop/weather/frontend - for mac
cd /var/www/weather/frontend

  COUNTRIES=("KG" "AZ" "TR" "KZ" "UZ" "TM" "TJ")

  for COUNTRY in "${COUNTRIES[@]}"; do
    echo "Building $COUNTRY..."
    NEXT_PUBLIC_COUNTRY=$COUNTRY npm run build
    cp -r .next .next-$COUNTRY
    echo "$COUNTRY done ✓"
  done

  cd /var/www/weather
    for C in "${COUNTRIES[@]}"; do
      mkdir -p frontend-$C
      rm -rf frontend-$C/.next
      cp -r frontend/.next-$C frontend-$C/.next
      ln -sf /var/www/weather/frontend/node_modules frontend-$C/node_modules
      ln -sf /var/www/weather/frontend/public frontend-$C/public
      ln -sf /var/www/weather/frontend/package.json frontend-$C/package.json
    done

    echo "All done ✓"