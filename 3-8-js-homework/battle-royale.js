let selectedSkill = null;

class Fighter {
  constructor() {
    this.baseHitPoints = 100;
    this.baseAttack = 50;
    this.baseDefense = 5;
    this.baseSpeed = 5;
    this.attackBuff = false;
    this.attackDebuff = false;
    this.attackBuffCount = 0;
    this.attackDebuffCount = 0;
    this.defenseBuff = false;
    this.defenseDebuff = false;
    this.defenseBuffCount = 0;
    this.defenseDebuffCount = 0;
    this.initiative = 0;
    this.speedBuff = false;
    this.speedDebuff = false;
    this.stunDebuff = false;
    this.stunDebuffCount = 0;
    this.burnDebuff = false;
    this.burnDebuffCount = 0;
    this.speedBuffCount = 0;
    this.speedDebuffCount = 0;
    this.secondSkillCount = 0;
    this.thirdSkillCount = 0;
  }
}

class Earth extends Fighter {
  constructor(name) {
    super();
    this.name = name;
    this.typeHitPoints = this.baseHitPoints;
    this.typeAttack = this.baseAttack;
    this.typeDefense = this.baseDefense;
    this.typeSpeed = this.baseSpeed;
    let fighterId = document.getElementById(this.name);
    this.skill1Button = fighterId.querySelector(".skill-1-btn");
    this.skill2Button = fighterId.querySelector(".skill-2-btn");
    this.skill3Button = fighterId.querySelector(".skill-3-btn");
    this.skill1Button.addEventListener("click", (event) => {
      event.stopPropagation();
      selectedSkill = (target) => this.stun(target);
      allFighters.forEach((fighter) => {
        const fighterDiv = document.getElementById(fighter.name);
        if (fighter.team === this.team) {
          fighterDiv.removeEventListener("click", fighterDiv.clickHandler);
          fighterDiv.style.opacity = "0.5";
        }
        if (fighter.team !== this.team) {
          fighterDiv.addEventListener("click", fighterDiv.clickHandler);
          fighterDiv.style.opacity = "1";
        }
      });
    });
    this.skill2Button.addEventListener("click", (event) => {
      event.stopPropagation();
      selectedSkill = (target) => this.defenseUp(target);
      allFighters.forEach((fighter) => {
        const fighterDiv = document.getElementById(fighter.name);
        if (fighter.team !== this.team) {
          fighterDiv.removeEventListener("click", fighterDiv.clickHandler);
          fighterDiv.style.opacity = "0.5";
        }
        if (fighter.team === this.team) {
          fighterDiv.addEventListener("click", fighterDiv.clickHandler);
          fighterDiv.style.opacity = "1";
        }
      });
    });
    this.skill3Button.addEventListener("click", (event) => {
      event.stopPropagation();
      selectedSkill = (target) => this.slam(target);
      allFighters.forEach((fighter) => {
        const fighterDiv = document.getElementById(fighter.name);
        if (fighter.team === this.team) {
          fighterDiv.removeEventListener("click", fighterDiv.clickHandler);
          fighterDiv.style.opacity = "0.5";
        }
        if (fighter.team !== this.team) {
          fighterDiv.addEventListener("click", fighterDiv.clickHandler);
          fighterDiv.style.opacity = "1";
        }
      });
    });
  }

  // stun(target) {
  //   if (this.special) {
  //     this.specialSkill();
  //   }
  //   target.stunDebuff = true;
  //   target.stunDebuffCount = 2;
  //   targetHit(target);
  //   buffCountTracker(this);
  //   updateLog(`${this.name} stunned ${target.name}`, "red");
  //   if (this.endSpecial) {
  //     this.endSpecialSkill();
  //   }
  //   endOfTurn(this);
  // }

  stun(target) {
    preAttackSpecial(this, target);
    stunDebuff(target, 2);
    targetHit(target);
    updateLog(`${this.name} stunned ${target.name} for two turns`, "red");
    buffCountTracker(this);
    postAttackSpecial(this, target);
    endOfTurn(this);
  }

  DefenseUp(target) {
    preAttackSpecial(this, target);
    defenseDebuff(target, 2);
    buffCountTracker(this);
    this.secondSkillCount = 1;
    updateLog(`${this.name} increased ${target.name}'s defense!`, "green");
    postAttackSpecial(this, target);
    endOfTurn(this);
  }

  slam(target) {
    if (this.special) {
      this.specialSkill();
    }
    if (this.currentAttack() > target.currentDefense()) {
      target.currentHitPoints =
        target.currentHitPoints -
        (this.currentAttack() - target.currentDefense());
    }
    targetHit(target);
    buffCountTracker(this);
    this.thirdSkillCount = 2;
    updateLog(`${this.name} slammed ${target.name}`, "red");
    if (this.endSpecial) {
      this.endSpecialSkill();
    }
    endOfTurn(this);
  }
}

class Water extends Fighter {
  constructor(name) {
    super();
    this.name = name;
    this.typeHitPoints = this.baseHitPoints;
    this.typeAttack = this.baseAttack;
    this.typeDefense = this.baseDefense;
    this.typeSpeed = this.baseSpeed;
    let fighterId = document.getElementById(this.name);
    this.skill1Button = fighterId.querySelector(".skill-1-btn");
    this.skill2Button = fighterId.querySelector(".skill-2-btn");
    this.skill3Button = fighterId.querySelector(".skill-3-btn");
    this.skill1Button.addEventListener("click", (event) => {
      event.stopPropagation();
      selectedSkill = (target) => this.slow(target);
      allFighters.forEach((fighter) => {
        const fighterDiv = document.getElementById(fighter.name);
        if (fighter.team === this.team) {
          fighterDiv.removeEventListener("click", fighterDiv.clickHandler);
          fighterDiv.style.opacity = "0.5";
        }
        if (fighter.team !== this.team) {
          fighterDiv.addEventListener("click", fighterDiv.clickHandler);
          fighterDiv.style.opacity = "1";
        }
      });
    });
    this.skill2Button.addEventListener("click", (event) => {
      event.stopPropagation();
      selectedSkill = (target) => this.attackUp(target);
      allFighters.forEach((fighter) => {
        const fighterDiv = document.getElementById(fighter.name);
        if (fighter.team !== this.team) {
          fighterDiv.removeEventListener("click", fighterDiv.clickHandler);
          fighterDiv.style.opacity = "0.5";
        }
        if (fighter.team === this.team) {
          fighterDiv.addEventListener("click", fighterDiv.clickHandler);
          fighterDiv.style.opacity = "1";
        }
      });
    });
    this.skill3Button.addEventListener("click", (event) => {
      event.stopPropagation();
      selectedSkill = (target) => this.attackAll(target);
      allFighters.forEach((fighter) => {
        const fighterDiv = document.getElementById(fighter.name);
        if (fighter.team === this.team) {
          fighterDiv.removeEventListener("click", fighterDiv.clickHandler);
          fighterDiv.style.opacity = "0.5";
        }
        if (fighter.team !== this.team) {
          fighterDiv.addEventListener("click", fighterDiv.clickHandler);
          fighterDiv.style.opacity = "1";
        }
      });
    });
  }

  slow(target) {
    if (this.special) {
      this.specialSkill();
    }
    target.speedDebuff = true;
    target.speedDebuffCount = 2;
    targetHit(target);
    buffCountTracker(this);
    updateLog(`${this.name} slowed ${target.name}`, "red");
    if (this.endSpecial) {
      this.endSpecialSkill();
    }
    endOfTurn(this);
  }

  attackUp(target) {
    if (this.special) {
      this.specialSkill();
    }
    allFighters.forEach((fighter) => {
      if (fighter.team === target.team) {
        fighter.attackBuff = true;
        fighter.attackBuffCount = 2;
        if (fighter === this) {
          fighter.attackBuffCount = 3;
        }
        targetBuffed(fighter);
      }
    });
    buffCountTracker(this);
    this.secondSkillCount = 1;
    updateLog(`${this.name} increased ${this.team}'s attack!`, "green");
    if (this.endSpecial) {
      this.endSpecialSkill();
    }
    endOfTurn(this);
  }

  attackAll(target) {
    if (this.special) {
      this.specialSkill();
    }
    allFighters.forEach((fighter) => {
      if (fighter.team === target.team) {
        if (this.currentAttack() > fighter.currentDefense()) {
          fighter.currentHitPoints =
            fighter.currentHitPoints -
            (this.currentAttack() - fighter.currentDefense()) * 0.6;
          targetHit(fighter);
        }
      }
    });
    buffCountTracker(this);
    this.thirdSkillCount = 2;
    updateLog(`${this.name} attacked ${target.team}`, "red");
    if (this.endSpecial) {
      this.endSpecialSkill();
    }
    endOfTurn(this);
  }
}

class Fire extends Fighter {
  constructor(name) {
    super();
    this.name = name;
    this.typeHitPoints = this.baseHitPoints;
    this.typeAttack = this.baseAttack;
    this.typeDefense = this.baseDefense;
    this.typeSpeed = this.baseSpeed;
    let fighterId = document.getElementById(this.name);
    this.skill1Button = fighterId.querySelector(".skill-1-btn");
    this.skill2Button = fighterId.querySelector(".skill-2-btn");
    this.skill3Button = fighterId.querySelector(".skill-3-btn");
    this.skill1Button.addEventListener("click", (event) => {
      event.stopPropagation();
      selectedSkill = (target) => this.scorch(target);
      allFighters.forEach((fighter) => {
        const fighterDiv = document.getElementById(fighter.name);
        if (fighter.team === this.team) {
          fighterDiv.removeEventListener("click", fighterDiv.clickHandler);
          fighterDiv.style.opacity = "0.5";
        }
        if (fighter.team !== this.team) {
          fighterDiv.addEventListener("click", fighterDiv.clickHandler);
          fighterDiv.style.opacity = "1";
        }
      });
    });
    this.skill2Button.addEventListener("click", (event) => {
      event.stopPropagation();
      selectedSkill = (target) => this.weaken(target);
      allFighters.forEach((fighter) => {
        const fighterDiv = document.getElementById(fighter.name);
        if (fighter.team === this.team) {
          fighterDiv.removeEventListener("click", fighterDiv.clickHandler);
          fighterDiv.style.opacity = "0.5";
        }
        if (fighter.team !== this.team) {
          fighterDiv.addEventListener("click", fighterDiv.clickHandler);
          fighterDiv.style.opacity = "1";
        }
      });
    });

    this.skill3Button.addEventListener("click", (event) => {
      event.stopPropagation();
      selectedSkill = (target) => this.explode(target);
      allFighters.forEach((fighter) => {
        const fighterDiv = document.getElementById(fighter.name);
        if (fighter.team === this.team) {
          fighterDiv.removeEventListener("click", fighterDiv.clickHandler);
          fighterDiv.style.opacity = "0.5";
        }
        if (fighter.team !== this.team) {
          fighterDiv.addEventListener("click", fighterDiv.clickHandler);
          fighterDiv.style.opacity = "1";
        }
      });
    });
  }

  scorch(target) {
    if (this.special) {
      this.specialSkill();
    }
    if (this.currentAttack() > target.currentDefense()) {
      target.currentHitPoints =
        target.currentHitPoints -
        (this.currentAttack() - target.currentDefense()) * 0.8;
      target.burnDebuff = true;
      target.burnDebuffCount = 3;
      targetHit(target);
    }
    buffCountTracker(this);
    updateLog(`${this.name} scorched ${target.name}`, "red");
    if (this.endSpecial) {
      this.endSpecialSkill();
    }
    endOfTurn(this);
  }

  weaken(target) {
    if (this.special) {
      this.specialSkill();
    }
    allFighters.forEach((fighter) => {
      if (fighter.team === target.team) {
        fighter.attackDebuff = true;
        fighter.attackDebuffCount = 2;
        targetHit(fighter);
      }
    });
    buffCountTracker(this);
    this.secondSkillCount = 1;
    updateLog(`${this.name} weakened ${target.team}`, "red");
    if (this.endSpecial) {
      this.endSpecialSkill();
    }
    endOfTurn(this);
  }

  explode(target) {
    if (this.special) {
      this.specialSkill();
    }
    if (this.currentAttack() > target.currentDefense()) {
      target.currentHitPoints =
        target.currentHitPoints -
        (this.currentAttack() - target.currentDefense()) * 1.5;
      targetHit(target);
    }
    buffCountTracker(this);
    this.thirdSkillCount = 2;
    updateLog(`${this.name} exploded ${target.name}`, "red");
    if (this.endSpecial) {
      this.endSpecialSkill();
    }
    endOfTurn(this);
  }
}

class Warrior extends Earth {
  constructor(name, team) {
    super(name);
    this.team = team;
    this.classHitPoints = 250 + this.typeHitPoints;
    this.currentHitPoints = this.classHitPoints;
    this.classAttack = 25 + this.typeAttack;
    this.attackMultiplier = () => {
      if (this.attackBuff) {
        return 1.2;
      } else if (this.attackDebuff) {
        return 0.8;
      } else {
        return 1;
      }
    };
    this.currentAttack = () => {
      return this.classAttack * this.attackMultiplier();
    };
    this.classDefense = 40 + this.typeDefense;
    this.defenseMultiplier = () => {
      if (this.defenseBuff) {
        return this.classDefense * 1.4;
      } else if (this.defenseDebuff) {
        return this.classDefense * 0.6;
      } else {
        return 1;
      }
    };
    this.currentDefense = () => {
      return this.classDefense * this.defenseMultiplier();
    };
    this.classSpeed = 5 + this.typeSpeed;
    this.speedMultiplier = () => {
      if (this.speedBuff) {
        return 1.3;
      } else if (this.speedDebuff) {
        return 0.7;
      } else {
        return 1;
      }
    };
    this.currentSpeed = () => {
      return this.classSpeed * this.speedMultiplier();
    };
    this.special = true;
    this.specialSkill = () => {
      if (this.currentHitPoints < this.classHitPoints * 0.3) {
        this.attackMultiplier = () => {
          if (this.attackBuff) {
            return this.classAttack * 3;
          } else if (this.attackDebuff) {
            return this.classAttack * 1.5;
          } else {
            return 2.5;
          }
        };
      } else {
        this.attackMultiplier = () => {
          if (this.attackBuff) {
            return this.classAttack * 1.2;
          } else if (this.attackDebuff) {
            return this.classAttack * 0.8;
          } else {
            return 1;
          }
        };
      }
    };
    let fighterId = document.getElementById(this.name);
    this.specialSkill1Button = fighterId.querySelector(".skill-s1-btn");
    this.specialSkill2Button = fighterId.querySelector(".skill-s2-btn");
    this.specialSkill1Button.addEventListener("click", (event) => {
      event.stopPropagation();
      selectedSkill = (target) => this.enrageSlam(target);
      allFighters.forEach((fighter) => {
        const fighterDiv = document.getElementById(fighter.name);
        if (fighter.team === this.team) {
          fighterDiv.removeEventListener("click", fighterDiv.clickHandler);
          fighterDiv.style.opacity = "0.5";
        }
        if (fighter.team !== this.team) {
          fighterDiv.addEventListener("click", fighterDiv.clickHandler);
          fighterDiv.style.opacity = "1";
        }
      });
    });
    this.firstSpecialSkillCount = 0;
    this.specialSkill2Button.addEventListener("click", (event) => {
      event.stopPropagation();
      selectedSkill = (target) => this.beserk(target);
      allFighters.forEach((fighter) => {
        const fighterDiv = document.getElementById(fighter.name);
        if (fighter.team === this.team) {
          fighterDiv.removeEventListener("click", fighterDiv.clickHandler);
          fighterDiv.style.opacity = "0.5";
        }
        if (fighter.team !== this.team) {
          fighterDiv.addEventListener("click", fighterDiv.clickHandler);
          fighterDiv.style.opacity = "1";
        }
      });
    });
    this.secondSpecialSkillCount = 0;
  }

  enrageSlam(target) {
    if (this.special) {
      this.specialSkill();
    }
    allFighters.forEach((fighter) => {
      if (fighter.team === target.team) {
        if (this.currentAttack() > fighter.currentDefense()) {
          fighter.currentHitPoints =
            fighter.currentHitPoints -
            (this.currentAttack() - fighter.currentDefense()) * 0.6;
          targetHit(fighter);
        }
      }
    });
    buffCountTracker(this);
    this.firstSpecialSkillCount = 3;
    updateLog(`${this.name} enrageSlammed ${target.team}`, "red");
    if (this.endSpecial) {
      this.endSpecialSkill();
    }
    endOfTurn(this);
  }

  beserk(target) {
    if (this.special) {
      this.specialSkill();
    }
    if (this.currentHitPoints > target.currentDefense()) {
      target.currentHitPoints =
        target.currentHitPoints -
        ((this.currentHitPoints / 2) * this.attackMultiplier() -
          target.currentDefense());
      targetHit(target);
      this.currentHitPoints = 1;
      targetHit(this);
    }
    buffCountTracker(this);
    this.secondSpecialSkillCount = 5;
    updateLog(`${this.name} beserked ${target.name}`, "red");
    if (this.endSpecial) {
      this.endSpecialSkill();
    }
    endOfTurn(this);
  }
}

class Scholar extends Water {
  constructor(name, team) {
    super(name);
    this.team = team;

    this.classHitPoints = 135 + this.typeHitPoints;
    this.currentHitPoints = this.classHitPoints;
    this.classAttack = 75 + this.typeAttack;
    this.attackMultiplier = () => {
      if (this.attackBuff) {
        return 1.2;
      } else if (this.attackDebuff) {
        return 0.8;
      } else {
        return 1;
      }
    };
    this.currentAttack = () => {
      return this.classAttack * this.attackMultiplier();
    };
    this.classDefense = 10 + this.typeDefense;
    this.defenseMultiplier = () => {
      if (this.defenseBuff) {
        return this.classDefense * 1.4;
      } else if (this.defenseDebuff) {
        return this.classDefense * 0.6;
      } else {
        return 1;
      }
    };
    this.currentDefense = () => {
      return this.classDefense * this.defenseMultiplier();
    };
    this.classSpeed = 7 + this.typeSpeed;
    this.speedMultiplier = () => {
      if (this.speedBuff) {
        return 1.3;
      } else if (this.speedDebuff) {
        return 0.7;
      } else {
        return 1;
      }
    };
    this.currentSpeed = () => {
      return this.classSpeed * this.speedMultiplier();
    };
    this.special = false;
    this.endSpecial = true;
    this.endSpecialSkill = () => {
      if (Math.random() < 0.1) {
        this.speedBuff = true;
        this.speedBuffCount = 2;
      }
      if (Math.random() < 0.1) {
        this.attackBuff = true;
        this.attackBuffCount = 2;
      }
      if (Math.random() < 0.1) {
        this.defenseBuff = true;
        this.defenseBuffCount = 2;
      }
    };
    let fighterId = document.getElementById(this.name);
    this.specialSkill1Button = fighterId.querySelector(".skill-s1-btn");
    this.specialSkill2Button = fighterId.querySelector(".skill-s2-btn");
    this.specialSkill1Button.addEventListener("click", (event) => {
      event.stopPropagation();
      selectedSkill = (target) => this.cleanse(target);
      allFighters.forEach((fighter) => {
        const fighterDiv = document.getElementById(fighter.name);
        if (fighter.team !== this.team) {
          fighterDiv.removeEventListener("click", fighterDiv.clickHandler);
          fighterDiv.style.opacity = "0.5";
        }
        if (fighter.team === this.team) {
          fighterDiv.addEventListener("click", fighterDiv.clickHandler);
          fighterDiv.style.opacity = "1";
        }
      });
    });
    this.firstSpecialSkillCount = 0;
    this.specialSkill2Button.addEventListener("click", (event) => {
      event.stopPropagation();
      selectedSkill = (target) => this.refresh(target);
      allFighters.forEach((fighter) => {
        const fighterDiv = document.getElementById(fighter.name);
        if (fighter.team !== this.team) {
          fighterDiv.removeEventListener("click", fighterDiv.clickHandler);
          fighterDiv.style.opacity = "0.5";
        }
        if (fighter.team === this.team) {
          fighterDiv.addEventListener("click", fighterDiv.clickHandler);
          fighterDiv.style.opacity = "1";
        }
      });
    });
    this.secondSpecialSkillCount = 0;
  }

  cleanse(target) {
    if (this.special) {
      this.specialSkill();
    }
    if (target.stunDebuff) {
      target.stunDebuff = false;
      target.stunDebuffCount = 0;
    }
    if (target.burnDebuff) {
      target.burnDebuff = false;
      target.burnDebuffCount = 0;
    }
    if (target.speedDebuff) {
      target.speedDebuff = false;
      target.speedDebuffCount = 0;
    }
    if (target.attackDebuff) {
      target.attackDebuff = false;
      target.attackDebuffCount = 0;
    }
    if (target.defenseDebuff) {
      target.defenseDebuff = false;
      target.defenseDebuffCount = 0;
    }
    targetBuffed(target);
    buffCountTracker(this);
    this.secondSpecialSkillCount = 5;
    updateLog(`${this.name} cleansed ${target.name}`, "green");
    if (this.endSpecial) {
      this.endSpecialSkill();
    }
    endOfTurn(this);
  }

  refresh(target) {
    if (this.special) {
      this.specialSkill();
    }
    allFighters.forEach((fighter) => {
      if (fighter.team === this.team) {
        fighter.secondSkillCount = 0;
        fighter.thirdSkillCount = 0;
        fighter.firstSpecialSkillCount = 0;
        fighter.secondSpecialSkillCount = 0;
        targetBuffed(fighter);
      }
    });
    buffCountTracker(this);
    this.secondSpecialSkillCount = 5;
    updateLog(`${this.name} reset ${target.team}'s Abilities`, "green");
    if (this.endSpecial) {
      this.endSpecialSkill();
    }
    endOfTurn(this);
  }
}

class Rogue extends Fire {
  constructor(name, team) {
    super(name);
    this.team = team;
    this.classHitPoints = 150 + this.typeHitPoints;
    this.currentHitPoints = this.classHitPoints;
    this.classAttack = 125 + this.typeAttack;
    this.attackMultiplier = () => {
      if (this.attackBuff) {
        return 1.2;
      } else if (this.attackDebuff) {
        return 0.8;
      } else {
        return 1;
      }
    };
    this.currentAttack = () => {
      return this.classAttack * this.attackMultiplier();
    };
    this.classDefense = 30 + this.typeDefense;
    this.defenseMultiplier = () => {
      if (this.defenseBuff) {
        return this.classDefense * 1.4;
      } else if (this.defenseDebuff) {
        return this.classDefense * 0.6;
      } else {
        return 1;
      }
    };
    this.currentDefense = () => {
      return this.classDefense * this.defenseMultiplier();
    };
    this.classSpeed = 10 + this.typeSpeed;
    this.speedMultiplier = () => {
      if (this.speedBuff) {
        return 1.3;
      } else if (this.speedDebuff) {
        return 0.7;
      } else {
        return 1;
      }
    };
    this.currentSpeed = () => {
      return this.classSpeed * this.speedMultiplier();
    };
    this.special = true;
    this.specialSkill = () => {
      //special skill here
    };
    let fighterId = document.getElementById(this.name);
    this.specialSkill1Button = fighterId.querySelector(".skill-s1-btn");
    this.specialSkill2Button = fighterId.querySelector(".skill-s2-btn");
    this.specialSkill1Button.addEventListener("click", (event) => {
      event.stopPropagation();
      selectedSkill = (target) => this.SPECIALSKILL1(target);
      allFighters.forEach((fighter) => {
        const fighterDiv = document.getElementById(fighter.name);
        if (fighter.team === this.team) {
          fighterDiv.removeEventListener("click", fighterDiv.clickHandler);
          fighterDiv.style.opacity = "0.5";
        }
        if (fighter.team !== this.team) {
          fighterDiv.addEventListener("click", fighterDiv.clickHandler);
          fighterDiv.style.opacity = "1";
        }
      });
    });
    this.firstSpecialSkillCount = 0;
    this.specialSkill2Button.addEventListener("click", (event) => {
      event.stopPropagation();
      selectedSkill = (target) => this.SPECIALSKILL2(target);
      allFighters.forEach((fighter) => {
        const fighterDiv = document.getElementById(fighter.name);
        if (fighter.team === this.team) {
          fighterDiv.removeEventListener("click", fighterDiv.clickHandler);
          fighterDiv.style.opacity = "0.5";
        }
        if (fighter.team !== this.team) {
          fighterDiv.addEventListener("click", fighterDiv.clickHandler);
          fighterDiv.style.opacity = "1";
        }
      });
    });
    this.secondSpecialSkillCount = 0;
  }

  extendedskill1(target) {
    if (this.special) {
      this.specialSkill();
    }
    {
      //  extended skill 1 logic here
      targetHit(target);
    }
    buffCountTracker(this);
    this.firstSpecialSkillCount = 3;
    updateLog(`${this.name} ***SKILL NAME HERE*** ${target.name}`, "red");
    if (this.endSpecial) {
      this.endSpecialSkill();
    }
    endOfTurn(this);
  }

  extendedskill2(allFighters) {
    if (this.special) {
      this.specialSkill();
    }
    {
      //  extended skill 2 logic here
      targetHit(target);
    }
    buffCountTracker(this);
    this.secondSpecialSkillCount = 5;
    updateLog(`${this.name} ***SKILL NAME HERE*** ${target.name}`, "red");
    if (this.endSpecial) {
      this.endSpecialSkill();
    }
    endOfTurn(this);
  }
}

class Druid extends Earth {
  constructor(name, team) {
    super(name);
    this.team = team;
    this.classHitPoints = 200 + this.typeHitPoints;
    this.currentHitPoints = this.classHitPoints;
    this.classAttack = 50 + this.typeAttack;
    this.attackMultiplier = () => {
      if (this.attackBuff) {
        return 1.2;
      } else if (this.attackDebuff) {
        return 0.8;
      } else {
        return 1;
      }
    };
    this.currentAttack = () => {
      return this.classAttack * this.attackMultiplier();
    };
    this.classDefense = 35 + this.typeDefense;
    this.defenseMultiplier = () => {
      if (this.defenseBuff) {
        return this.classDefense * 1.4;
      } else if (this.defenseDebuff) {
        return this.classDefense * 0.6;
      } else {
        return 1;
      }
    };
    this.currentDefense = () => {
      return this.classDefense * this.defenseMultiplier();
    };
    this.classSpeed = 8 + this.typeSpeed;
    this.speedMultiplier = () => {
      if (this.speedBuff) {
        return 1.3;
      } else if (this.speedDebuff) {
        return 0.7;
      } else {
        return 1;
      }
    };
    this.currentSpeed = () => {
      return this.classSpeed * this.speedMultiplier();
    };
    this.special = true;
    this.specialSkill = () => {
      this.currentHitPoints = this.currentHitPoints + 10;
    };
    let fighterId = document.getElementById(this.name);
    this.specialSkill1Button = fighterId.querySelector(".skill-s1-btn");
    this.specialSkill2Button = fighterId.querySelector(".skill-s2-btn");
    this.specialSkill1Button.addEventListener("click", (event) => {
      event.stopPropagation();
      selectedSkill = (target) => this.singleHeal(target);
      allFighters.forEach((fighter) => {
        const fighterDiv = document.getElementById(fighter.name);
        if (fighter.team !== this.team) {
          fighterDiv.removeEventListener("click", fighterDiv.clickHandler);
          fighterDiv.style.opacity = "0.5";
        }
        if (fighter.team === this.team) {
          fighterDiv.addEventListener("click", fighterDiv.clickHandler);
          fighterDiv.style.opacity = "1";
        }
      });
    });
    this.firstSpecialSkillCount = 0;
    this.specialSkill2Button.addEventListener("click", (event) => {
      event.stopPropagation();
      selectedSkill = (target) => this.teamHeal(target);
      allFighters.forEach((fighter) => {
        const fighterDiv = document.getElementById(fighter.name);
        if (fighter.team !== this.team) {
          fighterDiv.removeEventListener("click", fighterDiv.clickHandler);
          fighterDiv.style.opacity = "0.5";
        }
        if (fighter.team === this.team) {
          fighterDiv.addEventListener("click", fighterDiv.clickHandler);
          fighterDiv.style.opacity = "1";
        }
      });
    });
    this.secondSpecialSkillCount = 0;
  }

  singleHeal(target) {
    if (this.special) {
      this.specialSkill();
    }
    if (target.currentHitPoints > 0) {
      target.currentHitPoints = target.classHitPoints;
      targetBuffed(target);
    }
    this.firstSpecialSkillCount = 4;
    buffCountTracker(this);
    updateLog(`${this.name} fully healed ${target.name}`, "green");
    if (this.endSpecial) {
      this.endSpecialSkill();
    }
    endOfTurn(this);
  }

  teamHeal(target) {
    if (this.special) {
      this.specialSkill();
    }
    allFighters.forEach((fighter) => {
      if (fighter.team === target.team) {
        if (fighter.currentHitPoints > 0) {
          fighter.currentHitPoints = fighter.currentHitPoints + 50;
          if (fighter.currentHitPoints > fighter.classHitPoints) {
            fighter.currentHitPoints = fighter.classHitPoints;
          }
          targetBuffed(fighter);
        }
      }
    });
    this.secondSpecialSkillCount = 6;
    buffCountTracker(this);
    updateLog(`${this.name} healed ${target.team} for 50 hp`, "green");
    if (this.endSpecial) {
      this.endSpecialSkill();
    }
    endOfTurn(this);
  }
}

class Hunter extends Water {
  constructor(name, team) {
    super(name);
    this.team = team;

    this.classHitPoints = 150 + this.typeHitPoints;
    this.currentHitPoints = this.classHitPoints;
    this.classAttack = 135 + this.typeAttack;
    this.attackMultiplier = () => {
      if (this.attackBuff) {
        return 1.2;
      } else if (this.attackDebuff) {
        return 0.8;
      } else {
        return 1;
      }
    };
    this.currentAttack = () => {
      return this.classAttack * this.attackMultiplier();
    };
    this.classDefense = 20 + this.typeDefense;
    this.defenseMultiplier = () => {
      if (this.defenseBuff) {
        return this.classDefense * 1.4;
      } else if (this.defenseDebuff) {
        return this.classDefense * 0.6;
      } else {
        return 1;
      }
    };
    this.currentDefense = () => {
      return this.classDefense * this.defenseMultiplier();
    };
    this.classSpeed = 11 + this.typeSpeed;
    this.speedMultiplier = () => {
      if (this.speedBuff) {
        return 1.3;
      } else if (this.speedDebuff) {
        return 0.7;
      } else {
        return 1;
      }
    };
    this.currentSpeed = () => {
      return this.classSpeed * this.speedMultiplier();
    };
    this.special = true;
    this.specialSkill = () => {
      //special skill here
    };
    let fighterId = document.getElementById(this.name);
    this.specialSkill1Button = fighterId.querySelector(".skill-s1-btn");
    this.specialSkill2Button = fighterId.querySelector(".skill-s2-btn");
    this.specialSkill1Button.addEventListener("click", (event) => {
      event.stopPropagation();
      selectedSkill = (target) => this.SPECIALSKILL1(target);
      allFighters.forEach((fighter) => {
        const fighterDiv = document.getElementById(fighter.name);
        if (fighter.team === this.team) {
          fighterDiv.removeEventListener("click", fighterDiv.clickHandler);
          fighterDiv.style.opacity = "0.5";
        }
        if (fighter.team !== this.team) {
          fighterDiv.addEventListener("click", fighterDiv.clickHandler);
          fighterDiv.style.opacity = "1";
        }
      });
    });
    this.firstSpecialSkillCount = 0;
    this.specialSkill2Button.addEventListener("click", (event) => {
      event.stopPropagation();
      selectedSkill = (target) => this.SPECIALSKILL2(target);
      allFighters.forEach((fighter) => {
        const fighterDiv = document.getElementById(fighter.name);
        if (fighter.team === this.team) {
          fighterDiv.removeEventListener("click", fighterDiv.clickHandler);
          fighterDiv.style.opacity = "0.5";
        }
        if (fighter.team !== this.team) {
          fighterDiv.addEventListener("click", fighterDiv.clickHandler);
          fighterDiv.style.opacity = "1";
        }
      });
    });
    this.secondSpecialSkillCount = 0;
  }

  extendedskill1(target) {
    if (this.special) {
      this.specialSkill();
    }
    {
      //  extended skill 1 logic here
      targetHit(target);
    }
    buffCountTracker(this);
    this.firstSpecialSkillCount = 2;
    updateLog(`${this.name} ***SKILL NAME HERE*** ${target.name}`, "red");
    if (this.endSpecial) {
      this.endSpecialSkill();
    }
    endOfTurn(this);
  }

  extendedskill2(allFighters) {
    if (this.special) {
      this.specialSkill();
    }
    {
      //  extended skill 2 logic here
      targetHit(target);
    }
    buffCountTracker(this);
    this.secondSpecialSkillCount = 4;
    updateLog(`${this.name} ***SKILL NAME HERE*** ${target.name}`, "red");
    if (this.endSpecial) {
      this.endSpecialSkill();
    }
    endOfTurn(this);
  }
}

class Mage extends Fire {
  constructor(name, team) {
    super(name);
    this.team = team;
    this.classHitPoints = 125 + this.typeHitPoints;
    this.currentHitPoints = this.classHitPoints;
    this.classAttack = 150 + this.typeAttack;
    this.attackMultiplier = () => {
      if (this.attackBuff) {
        return 1.2;
      } else if (this.attackDebuff) {
        return 0.8;
      } else {
        return 1;
      }
    };
    this.currentAttack = () => {
      return this.classAttack * this.attackMultiplier();
    };
    this.classDefense = 15 + this.typeDefense;
    this.defenseMultiplier = () => {
      if (this.defenseBuff) {
        return this.classDefense * 1.4;
      } else if (this.defenseDebuff) {
        return this.classDefense * 0.6;
      } else {
        return 1;
      }
    };
    this.currentDefense = () => {
      return this.classDefense * this.defenseMultiplier();
    };
    this.classSpeed = 9 + this.typeSpeed;
    this.speedMultiplier = () => {
      if (this.speedBuff) {
        return 1.3;
      } else if (this.speedDebuff) {
        return 0.7;
      } else {
        return 1;
      }
    };
    this.currentSpeed = () => {
      return this.classSpeed * this.speedMultiplier();
    };
    this.special = true;
    this.specialSkill = () => {
      //special skill here
    };
    let fighterId = document.getElementById(this.name);
    this.specialSkill1Button = fighterId.querySelector(".skill-s1-btn");
    this.specialSkill2Button = fighterId.querySelector(".skill-s2-btn");
    this.specialSkill1Button.addEventListener("click", (event) => {
      event.stopPropagation();
      selectedSkill = (target) => this.SPECIALSKILL1(target);
      allFighters.forEach((fighter) => {
        const fighterDiv = document.getElementById(fighter.name);
        if (fighter.team === this.team) {
          fighterDiv.removeEventListener("click", fighterDiv.clickHandler);
          fighterDiv.style.opacity = "0.5";
        }
        if (fighter.team !== this.team) {
          fighterDiv.addEventListener("click", fighterDiv.clickHandler);
          fighterDiv.style.opacity = "1";
        }
      });
    });
    this.firstSpecialSkillCount = 0;
    this.specialSkill2Button.addEventListener("click", (event) => {
      event.stopPropagation();
      selectedSkill = (target) => this.SPECIALSKILL2(target);
      allFighters.forEach((fighter) => {
        const fighterDiv = document.getElementById(fighter.name);
        if (fighter.team === this.team) {
          fighterDiv.removeEventListener("click", fighterDiv.clickHandler);
          fighterDiv.style.opacity = "0.5";
        }
        if (fighter.team !== this.team) {
          fighterDiv.addEventListener("click", fighterDiv.clickHandler);
          fighterDiv.style.opacity = "1";
        }
      });
    });
    this.secondSpecialSkillCount = 0;
  }

  extendedskill1(target) {
    if (this.special) {
      this.specialSkill();
    }
    {
      //  extended skill 1 logic here
      targetHit(target);
    }
    buffCountTracker(this);
    this.firstSpecialSkillCount = 3;
    updateLog(`${this.name} ***SKILL NAME HERE*** ${target.name}`, "red");
    if (this.endSpecial) {
      this.endSpecialSkill();
    }
    endOfTurn(this);
  }

  extendedskill2(allFighters) {
    if (this.special) {
      this.specialSkill();
    }
    {
      //  extended skill 2 logic here
      targetHit(target);
    }
    buffCountTracker(this);
    this.secondSpecialSkillCount = 5;
    updateLog(`${this.name} ***SKILL NAME HERE*** ${target.name}`, "red");
    if (this.endSpecial) {
      this.endSpecialSkill();
    }
    endOfTurn(this);
  }
}

const warriorDiv = document.getElementById("calvin");
const calvin = new Warrior("calvin", "Team 1");
warriorDiv.fighter = calvin;
warriorDiv.addEventListener("click", () => {
  if (selectedSkill) {
    selectedSkill(warriorDiv.fighter);
    selectedSkill = null;
  }
});
// let calvinHitpoints = document.getElementById("calvin-hitpoints");
// let calvinAttack = document.getElementById("calvin-attack");
// let calvinDefense = document.getElementById("calvin-defense");
// let calvinFireDebuff = warriorDiv.querySelector(".burn-debuff");
// let calvinStunDebuff = warriorDiv.querySelector(".stun-debuff");
// calvinHitpoints.textContent = `Hitpoints: ${calvin.currentHitPoints}`;
// calvinAttack.textContent = `Attack: ${calvin.currentAttack()}`;
// calvinDefense.textContent = `Defense: ${calvin.currentDefense()}`;
// calvinFireDebuff.style.display = calvin.burnDebuff ? "block" : "none";
// calvinStunDebuff.style.display = calvin.stunDebuff ? "block" : "none";

const scholarDiv = document.getElementById("felix");
const felix = new Scholar("felix", "Team 1");
scholarDiv.fighter = felix;
scholarDiv.addEventListener("click", () => {
  if (selectedSkill) {
    selectedSkill(scholarDiv.fighter);
    selectedSkill = null;
  }
});

const rogueDiv = document.getElementById("clara");
const clara = new Rogue("clara", "Team 1");
rogueDiv.fighter = clara;
rogueDiv.addEventListener("click", () => {
  if (selectedSkill) {
    selectedSkill(rogueDiv.fighter);
    selectedSkill = null;
  }
});

const druidDiv = document.getElementById("fiona");
const fiona = new Druid("fiona", "Team 2");
druidDiv.fighter = fiona;
druidDiv.addEventListener("click", () => {
  if (selectedSkill) {
    selectedSkill(druidDiv.fighter);
    selectedSkill = null;
  }
});

const hunterDiv = document.getElementById("alex");
const alex = new Hunter("alex", "Team 2");
hunterDiv.fighter = alex;
hunterDiv.addEventListener("click", () => {
  if (selectedSkill) {
    selectedSkill(hunterDiv.fighter);
    selectedSkill = null;
  }
});

const mageDiv = document.getElementById("maeve");
const maeve = new Mage("maeve", "Team 2");
mageDiv.fighter = maeve;
mageDiv.addEventListener("click", () => {
  if (selectedSkill) {
    selectedSkill(mageDiv.fighter);
    selectedSkill = null;
  }
});

let allFighters = [calvin, felix, clara, fiona, alex, maeve];

let readyFighters = [];
let currentFighter;

function startOfTurn(fighter) {
  if (fighter.startSpecial) {
    fighter.startSpecialSkill();
  }
  if (fighter.fireDebuff) {
    fighter.currentHitPoints = fighter.currentHitPoints - 10;
  }
  if (fighter.stunDebuff) {
    updateLog(`${fighter.name} is stunned and cannot move`, "white");
    if (fighter.endSpecial) {
      fighter.endSpecialSkill();
    }
    endOfTurn(fighter);
  }
  let fighterActiveBorder = document.getElementById(fighter.name);
  fighterActiveBorder.style.borderColor = "white";
}

function buffCountTracker(fighter) {
  const buffCounts = [
    "stunDebuffCount",
    "burnDebuffCount",
    "speedBuffCount",
    "attackBuffCount",
    "defenseBuffCount",
    "defenseDebuffCount",
    "attackDebuffCount",
    "speedDebuffCount",
  ];

  buffCounts.forEach((buffCount) => {
    if (fighter[buffCount] > 0) {
      fighter[buffCount]--;
    }
  });
}

function skillCooldownTracker(fighter) {
  const skillCounts = [
    "secondSkillCount",
    "thirdSkillCount",
    "firstSpecialSkillCount",
    "secondSpecialSkillCount",
    "innateSkillCount",
  ];

  skillCounts.forEach((skillCount) => {
    if (fighter[skillCount] > 0) {
      fighter[skillCount]--;
    }
  });

  if (fighter.firstSpecialSkillCount > 0) {
    let fighterFirstSpecialSkillCooldown = document.querySelector(
      `#${fighter.name} .skill-s1-cd`
    );
    fighterFirstSpecialSkillCooldown.style.display = "block";
    let fighterFirstSpecialSkillCooldownText = document.querySelector(
      `#${fighter.name} .skill-s1-cd-text`
    );
    fighterFirstSpecialSkillCooldownText.textContent =
      fighter.firstSpecialSkillCount;
  }
}

function endOfTurn(fighter) {
  let targetActiveBorder = document.getElementById(fighter.name);
  targetActiveBorder.style.borderColor = "black";
  nextTurn();
}

function tick(allFighters) {
  allFighters.forEach((fighter) => {
    fighter.initiative += fighter.currentSpeed();
  });
  nextTurn(allFighters);
}

function nextTurn() {
  readyFighters = allFighters.filter((fighter) => fighter.initiative >= 100);

  if (readyFighters.length === 0) {
    tick(allFighters);
  } else {
    currentFighter = determineFighter(readyFighters);
    currentFighter.initiative = 0;
    startOfTurn(currentFighter);
    console.log(currentFighter.name + " is up next");
  }
}

function determineFighter() {
  readyFighters.sort((a, b) => b.initiative - a.initiative);
  return readyFighters[0];
}

function targetHit(target) {
  let targetHitOverlay = document.querySelector(`#${target.name} .hit-overlay`);
  targetHitOverlay.style.display = "block";
  setTimeout(() => {
    targetHitOverlay.style.display = "none";
  }, 500);
  if (target.currentHitPoints <= 0) {
    target.currentHitPoints = 0;
    console.log("words");
    console.log({ currentHitPoints: target.currentHitPoints });
    let targetDeadOverlay = document.querySelector(
      `#${target.name} .dead-overlay`
    );
    targetDeadOverlay.style.display = "block";
    refreshUI();

    let index = allFighters.indexOf(target);
    if (index > -1) {
      allFighters.splice(index, 1);
    }
  }
  refreshUI();
}

function targetBuffed(target) {
  let targetHealOverlay = document.querySelector(
    `#${target.name} .heal-overlay`
  );
  setTimeout(() => {
    targetHealOverlay.style.display = "block";
  }, 200);
  setTimeout(() => {
    targetHealOverlay.style.display = "none";
  }, 1000);

  refreshUI();
}

function updateLog(message, color) {
  let log = document.getElementById("log");
  let newMessage = document.createElement("p");
  newMessage.textContent = message;
  newMessage.style.color = color;
  log.appendChild(newMessage);
  log.scrollTop = log.scrollHeight;
}

function refreshUI() {
  allFighters.forEach((fighter) => {
    let fighterHitpoints = document.getElementById(`${fighter.name}-hitpoints`);
    fighterHitpoints.textContent = `Hitpoints: ${fighter.currentHitPoints}`;

    let fighterAttack = document.getElementById(`${fighter.name}-attack`);
    let fighterAttackBuff = document.querySelector(
      `#${fighter.name} .attack-buff`
    );
    let fighterAttackDebuff = document.querySelector(
      `#${fighter.name} .attack-debuff`
    );
    fighterAttackBuff.style.display = fighter.attackBuff ? "block" : "none";
    fighterAttackDebuff.style.display = fighter.attackDebuff ? "block" : "none";
    fighterAttack.textContent = `Attack: ${fighter.currentAttack()}`;

    let fighterDefense = document.getElementById(`${fighter.name}-defense`);
    let fighterDefenseBuff = document.querySelector(
      `#${fighter.name} .defense-buff`
    );
    let fighterDefenseDebuff = document.querySelector(
      `#${fighter.name} .defense-debuff`
    );
    fighterDefenseBuff.style.display = fighter.defenseBuff ? "block" : "none";
    fighterDefenseDebuff.style.display = fighter.defenseDebuff
      ? "block"
      : "none";
    fighterDefense.textContent = `Defense: ${fighter.currentDefense()}`;

    let fighterSpeedBuff = document.querySelector(
      `#${fighter.name} .speed-buff`
    );
    let fighterSpeedDebuff = document.querySelector(
      `#${fighter.name} .speed-debuff`
    );
    fighterSpeedBuff.style.display = fighter.speedBuff ? "block" : "none";
    fighterSpeedDebuff.style.display = fighter.speedDebuff ? "block" : "none";

    let fighterFireDebuff = document.querySelector(
      `#${fighter.name} .burn-debuff`
    );
    fighterFireDebuff.style.display = fighter.burnDebuff ? "block" : "none";

    let fighterStunDebuff = document.querySelector(
      `#${fighter.name} .stun-debuff`
    );
    fighterStunDebuff.style.display = fighter.stunDebuff ? "block" : "none";

    let fighterHealthyImage = document.querySelector(
      `#${fighter.name} .healthy`
    );
    let fighterInjuredImage = document.querySelector(
      `#${fighter.name} .injured`
    );
    let fighterDeadImage = document.querySelector(`#${fighter.name} .dead`);

    fighterHealthyImage.style.display =
      fighter.currentHitPoints > fighter.classHitPoints * 0.3
        ? "block"
        : "none";
    fighterInjuredImage.style.display =
      fighter.currentHitPoints <= fighter.classHitPoints * 0.3 &&
      fighter.currentHitPoints > 0
        ? "block"
        : "none";
    fighterDeadImage.style.display =
      fighter.currentHitPoints <= 0 ? "block" : "none";
    allFighters.forEach((fighter) => {
      const fighterDiv = document.getElementById(fighter.name);
      fighterDiv.style.opacity = "1";
    });
  });
}

nextTurn();
refreshUI();

function preAttackSpecial(fighter, target) {
  if (fighter.special) {
    fighter.postAttackSkill(fighter, target);
  }
}

function postAttackSpecial(fighter, target) {
  if (fighter.postAttackSpecial) {
    fighter.postAttackSkill(fighter, target);
  }
  endOfTurn(fighter);
}

function attackBuff(target, duration) {
  target.attackBuff = true;
  target.attackBuffCount = duration;
}

function defenseBuff(target, duration) {
  allFighters.forEach((fighter) => {
    if (fighter.team === target.team) {
      if (fighter === this) {
        target.defenseBuff = true;
        target.defenseBuffCount = duration + 1;
      } else {
        target.defenseBuff = true;
        target.defenseBuffCount = duration;
      }
    }
  });
}

function speedBuff(target, duration) {
  target.speedBuff = true;
  target.speedBuffCount = duration;
}

function defenseDebuff(target, duration) {
  target.defenseDebuff = true;
  target.defenseDebuffCount = duration;
}

function attackDebuff(target, duration) {
  target.attackDebuff = true;
  target.attackDebuffCount = duration;
}

function speedDebuff(target, duration) {
  target.speedDebuff = true;
  target.speedDebuffCount = duration;
}

function stunDebuff(target, duration) {
  target.stunDebuff = true;
  target.stunDebuffCount = duration;
}

function burnDebuff(target, duration) {
  target.burnDebuff = true;
  target.burnDebuffCount = duration;
}
