export type CmsDataHp = {
  cmsDataHp: {
    section1Hide?: boolean;
    section2Hide?: boolean;
    section3Hide?: boolean;
    section4Hide?: boolean;
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
    section3MainHeading?: string;
    section3Card1Title?: string;
    section3Card1Subtitle?: string;
    section3Icon1?: string;
    section3Card2Title?: string;
    section3Card2Subtitle?: string;
    section3Icon2?: string;
    section3Card3Title?: string;
    section3Card3Subtitle?: string;
    section3Icon3?: string;
    section3Card4Title?: string;
    section3Card4Subtitle?: string;
    section3Icon4?: string;
    section3Card5Title?: string;
    section3Card5Subtitle?: string;
    section3Icon5?: string;
    section3Card6Title?: string;
    section3Card6Subtitle?: string;
    section3Icon6?: string;
    section4VideoUrl?: string;
    section4StepsTitlePart1?: string;
    section4StepsTitlePart2?: string;
    section4Step1Title?: string;
    section4Step1Text?: string;
    section4Step2Title?: string;
    section4Step2Text?: string;
    section4Step3Title?: string;
    section4Step3Text?: string;
    section4StepsButtonUrl?: string;
    section4StepsButtonText?: string;
    section4Image1?: string;
  };
};

export type CmsDataAboutUs = {
  cmsDataAboutUs: {
    section1Hide?: boolean;
    section1MainHeading?: string;
    section1Row1Text?: string;
    section1Row1VideoUrl?: string;
    section1Row2Text?: string;
    section1Image1?: string;
    section1Row3Text?: string;
    section1Image2?: string;
  };
};

export type CmsDataExploreNetwork = {
  cmsDataExploreNetwork: {
    test: string;
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
