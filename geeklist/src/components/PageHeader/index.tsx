import React, { ReactNode } from "react";
import { Link } from "react-router-dom";

import logoImg from "../../assets/images/logo.png";
import backIcon from "../../assets/images/icons/back.svg";
import { AiOutlineRollback } from "react-icons/ai";

import "./styles.css";

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  children,
}: PageHeaderProps) => {
  return (
    <header className="page-header">
      <div className="top-bar-container">
        <Link to="/">
          <AiOutlineRollback
            size={42}
            className={"top-bar-container-icon-back"}
          />
        </Link>
        <img src={logoImg} alt="GeekList" />
      </div>

      <div className="header-content">
        <strong>{title}</strong>
        {description && <p>{description}</p>}

        {children}
      </div>
    </header>
  );
};

export default PageHeader;
