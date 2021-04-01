import React from "react";
import Svg from "../../../components/Svg/Svg";
import { SvgProps } from "../../../components/Svg/types";

interface LogoProps extends SvgProps {
  isDark: boolean;
}

const Logo: React.FC<LogoProps> = ({ isDark, ...props }) => {
  // const textColor = isDark ? "#FFFFFF" : "#000000";
  return (
    <Svg viewBox="0 0 174 26" {...props}>
      <image
        href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAK4AAAAaCAMAAAAZiZe/AAAC91BMVEUAAAD///////////////////////////////////////////////////////////////////3///////////////7///////////////3///r///r//////////////////////////////////////////////////////////////vz///////////////////////////////////////////////////////////////////////////////////////////////////////////////v///3////8+vX///////////////////////////////////////3//////////vqJfYj////m39b////////9+ej+++n//vmmm6C4rqq+tK65sa3EubDMx7n///+6tK/Px7v////////x59b//uv9+uj/////++r//u6CcHKWhYGypqKYh4i/trW+t7KtpqfPx7ypnpPp49nRybnh3dHy79/Ry8X//+zUyr/9+ubs6Nrh18nk3dD+9uDv6tz58eT//+769OT58+T///8AAAADABUBAA0fAzAzSpEeBzgrL2gnJVogDj8GACAZAB0XABRSm/1DdMkvPn0XGU0iGEUfF0AEADkcASkWAScRAiMTAAsAAAdDe9g4Xqw7Xp43UJksN28pKV0kHUsFBEoiEkQQBzocDjYCAS8dBSwAACZ4xf9KheRFes5Bbb49ZrU5YbM6Yq0kMXcuOHZoWGhSQFpTQVUlJVE8KkojGEkaDkUaAyIRAAFfpP5MkPVZlOxVjuk3WaSdlJswS5uOipAwRIouQn9+cn4vQXhzZnMsMm5zXmcQH2MpJGAhLF82M11VS1o9NlElHlECDlEeFU4oFk0vHkMfFjaBbSgTABoNAABuwP9Tqv9spPpLhdU+ddVKdLsrUKVLZ6Q8VJuOhIJMV3BLSGlfUGZsdV5ERFKKjktIPktSM0UpEzd7cjUrJzWslikgGyNdQx4eABsyFhMIAAH8F1ZUAAAAi3RSTlMAgP3dNyheSs+ORzsuCQLwuRXy2J53UduHQx8ZB/jp49XSzcfDs3RqMiISDfrtta6opaKZlnxxblRAPTT05eHLvZB5WVhENisdGhjfxcCvq5tmYk4mFgsF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"
        width="174"
      ></image>
    </Svg>
  );
};

export default Logo;
