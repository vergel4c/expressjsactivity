-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema EnrolKodego
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `EnrolKodego` ;

-- -----------------------------------------------------
-- Schema EnrolKodego
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `EnrolKodego` DEFAULT CHARACTER SET utf8 ;
USE `EnrolKodego` ;

-- -----------------------------------------------------
-- Table `EnrolKodego`.`course_table`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `EnrolKodego`.`course_table` ;

CREATE TABLE IF NOT EXISTS `EnrolKodego`.`course_table` (
  `course_id` INT NOT NULL AUTO_INCREMENT,
  `course_name` VARCHAR(45) NOT NULL,
  `course_description` VARCHAR(45) NULL,
  PRIMARY KEY (`course_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `EnrolKodego`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `EnrolKodego`.`users` ;

CREATE TABLE IF NOT EXISTS `EnrolKodego`.`users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45) NULL DEFAULT NULL,
  `user_password` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  INDEX `fk_User_Students_idx` (`email` ASC) VISIBLE,
  CONSTRAINT `fk_User_Students`
    FOREIGN KEY (`email`)
    REFERENCES `EnrolKodego`.`students` (`email`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `EnrolKodego`.`students`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `EnrolKodego`.`students` ;

CREATE TABLE IF NOT EXISTS `EnrolKodego`.`students` (
  `student_id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NULL DEFAULT NULL,
  `course_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`student_id`),
  INDEX `fk_Students_Course Table1_idx` (`course_id` ASC) VISIBLE,
  INDEX `fk_Student_idx` (`email` ASC) VISIBLE,
  CONSTRAINT `fk_Students_Course Table1`
    FOREIGN KEY (`course_id`)
    REFERENCES `EnrolKodego`.`course_table` (`course_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Student`
    FOREIGN KEY (`email`)
    REFERENCES `EnrolKodego`.`users` (`email`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
