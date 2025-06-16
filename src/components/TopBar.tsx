"use client";
import { useState, memo, useRef, FormEvent } from "react";
import Image from "next/image";
import { useAppProvider } from "@/context/AppProvider";
import { notification } from "antd";
import XIcon from "./icons/XIcon";
import { useClickAway } from "react-use";
import {
  useRouter,
  usePathname,
  useSearchParams,
  ReadonlyURLSearchParams,
} from "next/navigation";
import * as NProgress from "nprogress";

interface TopBarProps {
  locale: string;
  t: {
    topBarText: string;
    topBarLink: string;
    requiredFieldsMessage: string;
    validEmail: string;
    acceptTerms: string;
    formErrorMessage: string;
    formSucessMessageNewsletter: string;
  };
}

const TopBar = ({ locale, t }: TopBarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchCity = searchParams.get("city");
  const searchDisciplines = searchParams.get("disciplines");

  const constructSearchPath = (searchParams: ReadonlyURLSearchParams) => {
    let searchPath = "?";
    const searchCity = searchParams.get("city");
    const searchCityArea = searchParams.get("cityArea");
    const searchDisciplines = searchParams.get("disciplines");
    const searchActivities = searchParams.get("activities");
    const searchAttributes = searchParams.get("attributes");

    if (searchCity) {
      searchPath += `city=${searchCity}`;
    }
    if (searchDisciplines) {
      searchPath += `&disciplines=${searchDisciplines}`;
    }
    if (searchCityArea) {
      searchPath += `&cityArea=${searchCityArea}`;
    }
    if (searchActivities) {
      searchPath += `&activities=${searchActivities}`;
    }
    if (searchAttributes) {
      searchPath += `&attributes=${searchAttributes}`;
    }
    return searchPath;
  };

  const generateRouteMainPath = (path: string) => {
    const splitedPath = path.split("/");
    if (splitedPath.length === 4 && splitedPath[3] === "search") {
      // make dynamic path for search
      const returnPath =
        path.split("/")[2] +
        "/" +
        path.split("/")[3] +
        constructSearchPath(searchParams);
      return returnPath;
    }

    if (splitedPath.length === 3) {
      return path.split("/")[2];
    }
    if (splitedPath.length === 4) {
      // return join the path with "/" separator starting from the 2nd element
      return path.split("/")[2] + "/" + path.split("/")[3];
    }
  };
  const routeMainPath = generateRouteMainPath(pathname);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const { isNewsletterModalOpen, setIsNewsletterModalOpen } = useAppProvider();
  const allOptions = ["en", `${process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION}`];
  const [secondaryLanguage, setSecondaryLanguage] = useState(
    allOptions.filter((option) => option !== locale)[0]
  );

  const handleToggleLangSwitchDropdown = () => {
    setLangDropdownOpen((prev) => !prev);
  };

  const handleSwitch = (lang: string) => {
    if (
      pathname === "/en" ||
      pathname === `/${process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION}`
    ) {
      NProgress.start();
      router.push(`/${lang}`);
      return;
    }
    NProgress.start();
    router.push(`/${lang}/${routeMainPath}`);
  };

  const [form, setForm] = useState({
    nameSurname: "",
    email: "",
    terms: false,
    newsUpdates: false,
  });

  const [formError, setFormError] = useState({
    nameSurname: false,
    email: false,
    terms: false,
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== "") {
      setFormError((prev) => ({
        ...prev,
        [e.target.name]: false,
      }));
    } else {
      setFormError((prev) => ({
        ...prev,
        [e.target.name]: true,
      }));
    }
    if (e.target.name === "terms" || e.target.name === "newsUpdates") {
      setForm({ ...form, [e.target.name]: e.target.checked });
      return;
    }
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNewsletterFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { nameSurname, email } = form;
    const fieldsToValidate = ["nameSurname", "email", "terms"];

    fieldsToValidate.forEach((field) => {
      setFormError((prev) => ({
        ...prev,
        [field]: !form[field as keyof typeof form],
      }));
    });

    const emailPatternVal = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPatternVal.test(email)) {
      setFormError((prev) => ({
        ...prev,
        email: true,
      }));
    }
    if (nameSurname === "" || email === "") {
      notification.error({
        message: t.requiredFieldsMessage,
      });
      return;
    }
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
      notification.error({
        message: t.validEmail,
      });
      return;
    }
    if (!form.terms) {
      notification.error({
        message: t.acceptTerms,
      });
      return;
    }
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/newslatter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nameSurname: form.nameSurname,
        email: form.email,
        newsUpdates: form.newsUpdates,
      }),
    })
      .then((r) => ({}))
      .catch((e) =>
        notification.error({
          message: t.formErrorMessage,
        })
      );
    notification.success({
      message: t.formSucessMessageNewsletter,
    });
    setTimeout(() => {
      setIsNewsletterModalOpen(false);
      setForm({
        nameSurname: "",
        email: "",
        terms: false,
        newsUpdates: false,
      });
    }, 2000);
  };

  const divRef = useRef(null);
  useClickAway(divRef, () => {
    // only if antd notification is not open
    if (document.querySelector(".ant-notification-notice") === null) {
      setIsNewsletterModalOpen(false);
    }
  });

  return (
    <div className="topbar">
      {isNewsletterModalOpen && (
        <div className="newsletter-modal">
          <div className="gray-overlay"></div>
          <div className="newsletter-modal-content" ref={divRef}>
            <XIcon onClick={() => setIsNewsletterModalOpen(false)} />
            {locale === process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION ? (
              <iframe
                src="https://98a7d926.sibforms.com/serve/MUIFAIBb85LW9UupjKSyIVy1qkR4IyEDihFzPmr-viJmbJ_R6irIPd1WiMV4f4OEzy1rv4saBvKyuVkMNeVIp1Kh4VpOieZ_4ZV3_bLOkJoz-IVFb_YIHgPq-LI7uv_MntsOsWEPQjjftO4z40MlMHguWokpWe7gfEZCiq0NhwYy7HY0SC8EzLFvIn5s4X5AoVJJdD7HjxKaG0Jw"
                frameBorder="0"
                allowFullScreen
                allow="geolocation; microphone; camera; encrypted-media"
                style={{
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                  maxWidth: "100%",
                }}
                className="iframe-newsletter-popup"
              ></iframe>
            ) : (
              <iframe
                // width="540"
                // height="305"
                src="https://98a7d926.sibforms.com/serve/MUIFAN8pxnkHzOSKilkZ_nBtLqvpCnCI29mec5xvRFe85D3ZYQbVVv8WU_5gEvjapUZOrbq6xowuBrtCwllTj32B0ddTxjHvsrioMuBLCBnWHcG1VR1p6uK6qlqKiuPym3L-XG9HXrWvd640htmu8CYuEarUugvO1FMWmEZvyYi0JSyMO0Vl-HiXbZpbiByPnHH_suF7ftv-PEZV"
                frameBorder="0"
                // scrolling="auto"
                allowFullScreen
                allow="geolocation; microphone; camera; encrypted-media"
                // style="display: block;margin-left: auto;margin-right: auto;max-width: 100%;"
                style={{
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                  maxWidth: "100%",
                }}
                className="iframe-newsletter-popup"
              ></iframe>
            )}
          </div>
        </div>
      )}
      <div className="wrapper">
        <div className="top-bar-flex">
          <p className="hero-small">
            {t?.topBarText}&nbsp;&nbsp;
            <span
              style={{ textDecoration: "underline", cursor: "pointer" }}
              onClick={() => setIsNewsletterModalOpen(true)}
            >
              {t?.topBarLink}
            </span>
          </p>
          {locale && (
            <div className="top-bar-logo-lang-wrap">
              {/* <p className="hero-small">Log in</p> */}
              <div className="lang-switch lang-switch--desktop">
                <div
                  style={{ display: "flex", gap: "10px", padding: "10px 0" }}
                  onClick={handleToggleLangSwitchDropdown}
                >
                  <span style={{ textTransform: "uppercase" }}>{locale}</span>
                  <Image
                    src="/assets/icons/lang-switch-arrow.svg"
                    width={15}
                    height={15}
                    alt="lang switch arrow"
                    className={`lang-switch-arrow ${
                      langDropdownOpen ? "active" : ""
                    }`}
                  />
                </div>
                <ul
                  className={`lang-switch-dropdown ${
                    langDropdownOpen ? "active" : ""
                  }`}
                >
                  <li
                    style={{ textTransform: "uppercase" }}
                    onClick={() => handleSwitch(secondaryLanguage)}
                  >
                    {secondaryLanguage}
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default memo(TopBar);
