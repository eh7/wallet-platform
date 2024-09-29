if [ -z $2 ]; then
    echo "USAGE: sh $0 <encrypt|decrypt> <FILE>"
  else
    if [ $1 = "decrypt" ]; then
      echo "decrypt"
      cp $2.nc $2.nc.bak
      mcrypt -d $2.nc
    else
      echo "encrypt"
      cp $2 $2.bak
      mcrypt $2
    fi
fi
