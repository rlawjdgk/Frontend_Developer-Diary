import React, { useState } from "react";
import styled from "styled-components";
import { IoPawSharp } from "react-icons/io5";
import { ProjectData } from "../assets/projectData";
import ModalProject from "./ModalProject";
import { style } from "framer-motion/client";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Inner = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 120px;
  @media screen and (max-width: 769px) {
    padding-top: 0px;
  }
`;

const SubTitle = styled.div`
  width: 130px;
  height: 37px;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px 10px;
  span {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
  }
  @media screen and (max-width: 769px) {
    margin-top: 0px;
    padding-top: 0px;
  }
`;

const MenuWrap = styled.ul`
  display: flex;
  gap: 30px;
  margin-top: 30px;
  li {
    margin-left: 10px;
    font-size: 18px;
    cursor: pointer;
    &.selected {
      font-weight: bold;
    }
  }
  @media screen and (max-width: 390px) {
    margin-top: 40px;
  }
`;

const ProjectItem = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-top: 40px;
  gap: 30px;
  cursor: pointer;
  .projectItem {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    cursor: pointer;
    @media screen and (max-width: 769px) {
      width: 30%;
      padding-top: 20px;
      flex-wrap: wrap;
    }
    @media screen and (max-width: 390px) {
      width: 45%;
      padding-top: 0px;
      gap: 20px;
    }
  }
  .data {
    width: 240px;
    height: 260px;
    background: #ccc;
    display: flex;
    border-radius: 20px;
    transition: all 0.9s;
    filter: brightness(50%);
    &:hover {
      transition: all 0.9s;
      filter: brightness(100%);
      scale: 1.1;
    }
    @media screen and (max-width: 390px) {
      width: 150px;
      height: 150px;
    }
  }
`;

const Span = styled.span`
  font-size: 16px;
  color: ${(props) => props.theme.textColor};
  @media screen and (max-width: 390px) {
    font-size: 14px;
    text-align: center;
  }
`;

const ShowMoreButton = styled.button`
  margin: 60px 0;
  width: 8%;
  padding: 10px 20px;
  font-size: 16px;
  display: flex;
  justify-content: center;
  margin-left: 470px;
  border: none;
  border-radius: 8px;
  background: ${(props) => props.theme.btnColor};
  color: ${(props) => props.theme.btnTextColor};
  cursor: pointer;
  @media screen and (max-width: 769px) {
    width: 16%;
    margin-left: 300px;
  }
  @media screen and (max-width: 390px) {
    width: 28%;
    margin-left: 120px;
  }
`;

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [visibleCount, setVisibleCount] = useState(8); // 처음에 표시할 프로젝트 개수

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setIsModalOpen(false);
  };

  const filteredProjects =
    selectedCategory === "all"
      ? ProjectData
      : ProjectData.filter((project) => project.category === selectedCategory);

  const handleShowMore = () => {
    setVisibleCount(visibleCount + 8); // 프로젝트 개수를 8개씩 늘리기
  };

  return (
    <Wrapper>
      <Inner id="Project">
        <SubTitle>
          <span>
            <IoPawSharp />
          </span>
          <span>Projects</span>
        </SubTitle>
        <MenuWrap>
          <li
            className={selectedCategory === "all" ? "selected" : ""}
            onClick={() => setSelectedCategory("all")}
          >
            All
          </li>
          <li
            className={selectedCategory === "publishing" ? "selected" : ""}
            onClick={() => setSelectedCategory("publishing")}
          >
            Publishing
          </li>
          <li
            className={selectedCategory === "frontend" ? "selected" : ""}
            onClick={() => setSelectedCategory("frontend")}
          >
            Frontend
          </li>
        </MenuWrap>
        <ProjectItem>
          {filteredProjects.slice(0, visibleCount).map((project) => (
            <div
              className="projectItem"
              key={project.id}
              onClick={() => openModal(project)}
            >
              <img className="data" src={project.image} alt={project.name} />
              <Span>{project.name}</Span>
            </div>
          ))}
        </ProjectItem>
        {visibleCount < filteredProjects.length && (
          <ShowMoreButton onClick={handleShowMore}>더보기</ShowMoreButton>
        )}
      </Inner>
      {isModalOpen && (
        <ModalProject project={selectedProject} onClose={closeModal} />
      )}
    </Wrapper>
  );
};

export default Projects;