import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

import Text from "@components/Text";

const PricePercentage: React.FC<{ price: number }> = ({ price }) => {
  const renderMain = () => {
    if (price > 0)
      return (
        <div className="flex align-center justify-end">
          <ArrowDropUpIcon sx={{ color: "#32ca5b", fontSize: 20 }} />
          <Text color="green">{`${price.toFixed(2)}%`}</Text>
        </div>
      );
    return (
      <div className="flex align-center justify-end">
        <ArrowDropDownIcon sx={{ color: "#ff3a33", fontSize: 20 }} />
        <Text color="red">{`${price.toFixed(2).replace("-", "")}%`}</Text>
      </div>
    );
  };

  return renderMain();
};

export default PricePercentage;
