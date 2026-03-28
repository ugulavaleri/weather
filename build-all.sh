cd ~/Desktop/weather/frontend

  COUNTRIES=("KG" "AZ" "TR" "KZ" "UZ" "TM" "TJ")

  for COUNTRY in "${COUNTRIES[@]}"; do
    echo "Building $COUNTRY..."
    NEXT_PUBLIC_COUNTRY=$COUNTRY npm run build
    cp -r .next .next-$COUNTRY
    echo "$COUNTRY done ✓"
  done