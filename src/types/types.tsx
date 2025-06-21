export type CmsDataHp = {
  cmsDataHp: {
    section1Hide?: boolean;
    section2Hide?: boolean;
    section1Card1Icon?: string;
    section1Card1Title?: string;
    section1Card1SubtitlePart1?: string;
    section1Card1SubtitlePart2?: string;
    section1Card1ButtonUrl?: string;
    section1Card1ButtonText?: string;
    section1Card2Icon?: string;
    section1Card2Title?: string;
    section1Card2SubtitlePart1?: string;
    section1Card2SubtitlePart2?: string;
    section1Card2ButtonUrl?: string;
    section1Card2ButtonText?: string;
    section2MainHeading?: string;
    section2Button1Text?: string;
    section2Button2Text?: string;
    section2List1Item1?: string;
    section2List1Item2?: string;
    section2List1Item3?: string;
    section2List1Item4?: string;
    section2List1Item5?: string;
    section2Image1?: string;
    section2List2Item1?: string;
    section2List2Item2?: string;
    section2List2Item3?: string;
    section2List2Item4?: string;
    section2Image2?: string;
  };
};

export type BtnFormProps = {
  text: string;
  primary?: boolean;
  secondary?: boolean;
  bigger?: boolean;
  letterSpace?: boolean;
  primaryBg?: boolean;
  white?: boolean;
  noHover?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};
