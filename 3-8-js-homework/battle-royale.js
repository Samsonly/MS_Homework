let selectedSkill = null;

class Fighter {
  constructor(name, team) {
    this.name = name;
    this.team = team;
    this.baseHitPoints = 100;
    this.baseAttack = 50;
    this.baseDefense = 50;
    this.baseSpeed = 10;
    this.initiative = 0;
    this.attackBuff = { active: false, count: 0, skill: "Attack" };
    this.attackDebuff = { active: false, count: 0, skill: "Attack" };
    this.defenseAvoidance = 1;
    this.defenseBuff = { active: false, count: 0, skill: "Defense" };
    this.defenseDebuff = { active: false, count: 0, skill: "Defense" };
    this.speedBuff = { active: false, count: 0, skill: "Speed" };
    this.speedDebuff = { active: false, count: 0, skill: "Speed" };
    this.stunDebuff = { active: false, count: 0, skill: "Stun" };
    this.burnDebuff = { active: false, count: 0, skill: "Burn" };
    this.innateSpecial = { active: true, count: 0, cooldown: 0, skill: null }; //figure out where this should go
    this.startOfTurnSpecial = {
      active: true,
      count: 0,
      cooldown: 0,
      skill: null,
    };
    this.preAttackSpecial = {
      active: true,
      count: 0,
      cooldown: 0,
      skill: null,
    };
    this.firstSkill = { active: true, count: 0, cooldown: 0 };
    this.secondSkill = { active: true, count: 0, cooldown: 1 };
    this.thirdSkill = { active: true, count: 0, cooldown: 2 };
    this.firstSpecialSkill = { active: true, count: 0, cooldown: 3 };
    this.secondSpecialSkill = { active: true, count: 0, cooldown: 5 };
    this.postAttackSpecial = {
      active: true,
      count: 0,
      cooldown: 0,
      skill: null,
    };
    this.endOfTurnSpecial = {
      active: true,
      count: 0,
      cooldown: 0,
      skill: null,
    };
    this.defensiveSkill = {
      active: true,
      count: 0,
      cooldown: 0,
      skill: null,
    };
    let fighterId = document.getElementById(this.name);
    this.firstSkillButton = fighterId.querySelector(".firstSkill-btn");
    this.secondSkillButton = fighterId.querySelector(".secondSkill-btn");
    this.thirdSkillButton = fighterId.querySelector(".thirdSkill-btn");
    this.firstSpecialSkillButton = fighterId.querySelector(
      ".firstSpecialSkill-btn"
    );
    this.secondSpecialSkillButton = fighterId.querySelector(
      ".secondSpecialSkill-btn"
    );
  }
}

class Earth extends Fighter {
  constructor(name, team) {
    super(name, team);
    this.typeHitPoints = this.baseHitPoints;
    this.typeAttack = this.baseAttack;
    this.typeDefense = this.baseDefense;
    this.typeSpeed = this.baseSpeed;
    this.type = "Earth";
    this.firstSkillButton.clickHandler = (event) => {
      event.stopPropagation();
      selectedSkill = (target) => this.stun(target);
      activeFighters.forEach((fighter) => {
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
    };

    this.secondSkillButton.clickHandler = (event) => {
      event.stopPropagation();
      selectedSkill = (target) => this.defenseUp(target);
      activeFighters.forEach((fighter) => {
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
    };

    this.thirdSkillButton.clickHandler = (event) => {
      event.stopPropagation();
      selectedSkill = (target) => this.slam(target);
      activeFighters.forEach((fighter) => {
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
    };
  }

  stun(target) {
    preAttackSpecial(this);
    debuffTarget(this, target, target.stunDebuff, 2, 1);
    attackTarget(this, target, 1.2, this.defenseAvoidance);
    postAttackSpecial(this);
    this.firstSkill.count = 1;
    endOfTurn(this);
  }

  defenseUp(target) {
    preAttackSpecial(this);
    buffTarget(this, target, target.defenseBuff, 2, 1);
    postAttackSpecial(this);
    this.secondSkill.count = 2;
    endOfTurn(this);
  }

  slam(target) {
    preAttackSpecial(this);
    debuffTeam(this, target, target.stunDebuff, 1, 0.2);
    attackTeam(this, target, 1.3, this.defenseAvoidance);
    postAttackSpecial(this);
    this.thirdSkill.count = 3;
    endOfTurn(this);
  }
}

class Water extends Fighter {
  constructor(name, team) {
    super(name, team);
    this.typeHitPoints = this.baseHitPoints;
    this.typeAttack = this.baseAttack;
    this.typeDefense = this.baseDefense;
    this.typeSpeed = this.baseSpeed;
    this.firstSkillButton.clickHandler = (event) => {
      event.stopPropagation();
      selectedSkill = (target) => this.slow(target);
      activeFighters.forEach((fighter) => {
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
    };

    this.secondSkillButton.clickHandler = (event) => {
      event.stopPropagation();
      selectedSkill = (target) => this.attackUp(target);
      activeFighters.forEach((fighter) => {
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
    };

    this.thirdSkillButton.clickHandler = (event) => {
      event.stopPropagation();
      selectedSkill = (target) => this.attackAll(target);
      activeFighters.forEach((fighter) => {
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
    };
  }

  slow(target) {
    preAttackSpecial(this);
    debuffTarget(this, target, target.speedDebuff, 1, 1);
    attackTarget(this, target, 1, this.defenseAvoidance);
    postAttackSpecial(this);
    this.firstSkill.count = 1;
    endOfTurn(this);
  }

  attackUp(target) {
    preAttackSpecial(this);
    buffTeam(this, target, target.attackBuff, 2, 1);
    postAttackSpecial(this);
    this.secondSkill.count = 2;
    endOfTurn(this);
  }

  attackAll(target) {
    preAttackSpecial(this);
    attackTeam(this, target, 1, this.defenseAvoidance);
    postAttackSpecial(this);
    this.thirdSkill.count = 3;
    endOfTurn(this);
  }
}

class Fire extends Fighter {
  constructor(name, team) {
    super(name, team);
    this.typeHitPoints = this.baseHitPoints;
    this.typeAttack = this.baseAttack;
    this.typeDefense = this.baseDefense;
    this.typeSpeed = this.baseSpeed;
    this.type = "Fire";
    this.firstSkillButton.clickHandler = (event) => {
      event.stopPropagation();
      selectedSkill = (target) => this.scorch(target);
      activeFighters.forEach((fighter) => {
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
    };

    this.secondSkillButton.clickHandler = (event) => {
      event.stopPropagation();
      selectedSkill = (target) => this.weaken(target);
      activeFighters.forEach((fighter) => {
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
    };

    this.thirdSkillButton.clickHandler = (event) => {
      event.stopPropagation();
      selectedSkill = (target) => this.fireBomb(target);
      activeFighters.forEach((fighter) => {
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
    };
  }

  scorch(target) {
    preAttackSpecial(this);
    debuffTarget(this, target, target.burnDebuff, 3, 1);
    attackTarget(this, target, 0.8, this.defenseAvoidance);
    postAttackSpecial(this);
    this.firstSkill.count = 1;
    endOfTurn(this);
  }

  weaken(target) {
    preAttackSpecial(this);
    debuffTeam(this, target, target.attackDebuff, 2, 0.75);
    attackTarget(this, target, 0.8, this.defenseAvoidance);
    postAttackSpecial(this);
    this.secondSkill.count = 2;
    endOfTurn(this);
  }

  fireBomb(target) {
    preAttackSpecial(this);
    attackTarget(this, target, 1.1, this.defenseAvoidance);
    postAttackSpecial(this);
    this.thirdSkill.count = 3;
    endOfTurn(this);
  }
}

class Warrior extends Earth {
  constructor(name, team) {
    super(name, team);
    this.classHitPoints = 250 + this.typeHitPoints;
    this.currentHitPoints = this.classHitPoints;
    this.classAttack = 65 + this.typeAttack;
    this.attackMultiplier = () => {
      if (this.attackBuff.active) {
        return 1.2;
      } else if (this.attackDebuff.active) {
        return 0.8;
      } else {
        return 1;
      }
    };
    this.currentAttack = () => {
      return Math.floor(this.classAttack * this.attackMultiplier());
    };
    this.classDefense = 40 + this.typeDefense;
    this.defenseMultiplier = () => {
      if (this.defenseBuff.active) {
        return 1.6;
      } else if (this.defenseDebuff.active) {
        return 1;
      } else {
        return 1.3;
      }
    };
    this.currentDefense = () => {
      return Math.floor(this.classDefense * this.defenseMultiplier());
    };
    this.classSpeed = 5 + this.typeSpeed;
    this.speedMultiplier = () => {
      if (this.speedBuff.active) {
        return 1.3;
      } else if (this.speedDebuff.active) {
        return 0.7;
      } else {
        return 1;
      }
    };
    this.currentSpeed = () => {
      return Math.floor(this.classSpeed * this.speedMultiplier());
    };
    this.startOfTurnSpecial = {
      active: true,
      count: 0,
      cooldown: 0,
      skill: () => {
        if (this.currentHitPoints < this.classHitPoints * 0.3) {
          updateLog(`${this.name} is enraged!`, "orange");
          this.attackMultiplier = () => {
            if (this.attackBuff.active) {
              return 1.6;
            } else if (this.attackDebuff.active) {
              return 1;
            } else {
              return 1.3;
            }
          };
        } else {
          this.attackMultiplier = () => {
            if (this.attackBuff.active) {
              return 1.2;
            } else if (this.attackDebuff.active) {
              return 0.8;
            } else {
              return 1;
            }
          };
        }
      },
    };
    this.firstSpecialSkillButton.clickHandler = (event) => {
      event.stopPropagation();
      selectedSkill = (target) => this.enragedSlam(target);
      activeFighters.forEach((fighter) => {
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
    };
    this.firstSpecialSkill.count = 0;
    this.secondSpecialSkillButton.clickHandler = (event) => {
      event.stopPropagation();
      selectedSkill = (target) => this.beserk(target);
      activeFighters.forEach((fighter) => {
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
    };
    this.secondSpecialSkill.count = 0;
  }

  enragedSlam(target) {
    preAttackSpecial(this);
    attackTeam(this, target, 1.2, this.defenseAvoidance);
    postAttackSpecial(this);
    this.firstSpecialSkill.count = 4;
    endOfTurn(this);
  }

  beserk(target) {
    preAttackSpecial(this);
    this.currentAttack = () => {
      return Math.floor(
        (this.currentHitPoints / 1.5) * this.attackMultiplier()
      );
    };
    attackTarget(this, target, 1, this.defenseAvoidance);
    this.currentHitPoints = this.currentHitPoints / 2;
    targetHit(this);
    this.currentAttack = () => {
      return Math.floor(this.classAttack * this.attackMultiplier());
    };
    postAttackSpecial(this);
    this.secondSpecialSkill.count = 6;
    endOfTurn(this);
  }
}

class Scholar extends Water {
  constructor(name, team) {
    super(name, team);
    this.classHitPoints = 135 + this.typeHitPoints;
    this.currentHitPoints = this.classHitPoints;
    this.classAttack = 95 + this.typeAttack;
    this.attackMultiplier = () => {
      if (this.attackBuff.active) {
        return 1.2;
      } else if (this.attackDebuff.active) {
        return 0.8;
      } else {
        return 1;
      }
    };
    this.currentAttack = () => {
      return Math.floor(this.classAttack * this.attackMultiplier());
    };
    this.classDefense = 10 + this.typeDefense;
    this.defenseMultiplier = () => {
      if (this.defenseBuff.active) {
        return 1.6;
      } else if (this.defenseDebuff.active) {
        return 1;
      } else {
        return 1.3;
      }
    };
    this.currentDefense = () => {
      return Math.floor(this.classDefense * this.defenseMultiplier());
    };
    this.classSpeed = 7 + this.typeSpeed;
    this.speedMultiplier = () => {
      if (this.speedBuff.active) {
        return 1.3;
      } else if (this.speedDebuff.active) {
        return 0.7;
      } else {
        return 1;
      }
    };
    this.currentSpeed = () => {
      return Math.floor(this.classSpeed * this.speedMultiplier());
    };
    this.endOfTurnSpecial = {
      active: true,
      count: 0,
      cooldown: 0,
      skill: () => {
        buffTarget(this, this, this.attackBuff, 2, 0.1);
        buffTarget(this, this, this.defenseBuff, 2, 0.1);
        buffTarget(this, this, this.speedBuff, 2, 0.1);
      },
    };
    this.firstSpecialSkillButton.clickHandler = (event) => {
      event.stopPropagation();
      selectedSkill = (target) => this.cleanse(target);
      activeFighters.forEach((fighter) => {
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
    };

    this.firstSpecialSkill.count = 0;
    this.secondSpecialSkillButton.clickHandler = (event) => {
      event.stopPropagation();
      selectedSkill = (target) => this.refresh(target);
      activeFighters.forEach((fighter) => {
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
    };

    this.secondSpecialSkill.count = 0;
  }

  cleanse(target) {
    preAttackSpecial(this);
    cleanseTarget(target);
    postAttackSpecial(this);
    this.firstSpecialSkill.count = 4;
    endOfTurn(this);
  }

  refresh(target) {
    preAttackSpecial(this);
    refreshTeam(target);
    buffTeam(this, target, target.speedBuff, 2, 1);
    boostTeam(target, 30);
    postAttackSpecial(this);
    this.secondSpecialSkill.count = 6;
    endOfTurn(this);
  }
}

class Rogue extends Fire {
  constructor(name, team) {
    super(name, team);
    this.classHitPoints = 150 + this.typeHitPoints;
    this.currentHitPoints = this.classHitPoints;
    this.classAttack = 100 + this.typeAttack;
    this.attackMultiplier = () => {
      if (this.attackBuff.active) {
        return 1.2;
      } else if (this.attackDebuff.active) {
        return 0.8;
      } else {
        return 1;
      }
    };
    this.currentAttack = () => {
      return Math.floor(this.classAttack * this.attackMultiplier());
    };
    this.classDefense = 30 + this.typeDefense;
    this.defenseMultiplier = () => {
      if (this.defenseBuff.active) {
        return 1.6;
      } else if (this.defenseDebuff.active) {
        return 1;
      } else {
        return 1.3;
      }
    };
    this.currentDefense = () => {
      return Math.floor(this.classDefense * this.defenseMultiplier());
    };
    this.classSpeed = 10 + this.typeSpeed;
    this.speedMultiplier = () => {
      if (this.speedBuff.active) {
        return 1.3;
      } else if (this.speedDebuff.active) {
        return 0.7;
      } else {
        return 1;
      }
    };
    this.currentSpeed = () => {
      return Math.floor(this.classSpeed * this.speedMultiplier());
    };
    this.preAttackSpecial = {
      active: true,
      count: 0,
      cooldown: 0,
      skill: () => {
        if (this.preAttackSpecial.active) {
          this.defenseAvoidance = 0.9;
        } else {
          this.defenseAvoidance = 1;
        }
      },
    };
    this.firstSpecialSkillButton.clickHandler = (event) => {
      event.stopPropagation();
      selectedSkill = (target) => this.successiveAttack(target);
      activeFighters.forEach((fighter) => {
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
    };

    this.firstSpecialSkill.count = 0;
    this.secondSpecialSkillButton.clickHandler = (event) => {
      event.stopPropagation();
      selectedSkill = (target) => this.hamstring(target);
      activeFighters.forEach((fighter) => {
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
    };

    this.secondSpecialSkill.count = 0;
  }

  successiveAttack(target) {
    preAttackSpecial(this);
    attackTarget(this, target, 0.8, this.defenseAvoidance);
    let counter = 8;
    let counterDecimal = () => {
      return counter / 10;
    };
    while (Math.random() <= counterDecimal()) {
      attackTarget(this, target, 0.8, this.defenseAvoidance);
      --counter;
    }
    postAttackSpecial(this);
    this.firstSpecialSkill.count = 4;
    endOfTurn(this);
  }

  hamstring(target) {
    preAttackSpecial(this);
    debuffTarget(this, target, target.speedDebuff, 1, 1);
    attackTarget(this, target, 1.4, this.defenseAvoidance);
    target.initiative = 0;
    postAttackSpecial(this);
    this.secondSpecialSkill.count = 6;
    endOfTurn(this);
  }
}

class Druid extends Earth {
  constructor(name, team) {
    super(name, team);
    this.classHitPoints = 200 + this.typeHitPoints;
    this.currentHitPoints = this.classHitPoints;
    this.classAttack = 60 + this.typeAttack;
    this.attackMultiplier = () => {
      if (this.attackBuff.active) {
        return 1.2;
      } else if (this.attackDebuff.active) {
        return 0.8;
      } else {
        return 1;
      }
    };
    this.currentAttack = () => {
      return Math.floor(this.classAttack * this.attackMultiplier());
    };
    this.classDefense = 35 + this.typeDefense;
    this.defenseMultiplier = () => {
      if (this.defenseBuff.active) {
        return 1.6;
      } else if (this.defenseDebuff.active) {
        return 1;
      } else {
        return 1.3;
      }
    };
    this.currentDefense = () => {
      return Math.floor(this.classDefense * this.defenseMultiplier());
    };
    this.classSpeed = 8 + this.typeSpeed;
    this.speedMultiplier = () => {
      if (this.speedBuff.active) {
        return 1.3;
      } else if (this.speedDebuff.active) {
        return 0.7;
      } else {
        return 1;
      }
    };
    this.currentSpeed = () => {
      return Math.floor(this.classSpeed * this.speedMultiplier());
    };
    this.startOfTurnSpecial = () => {
      return (this.currentHitPoints = this.currentHitPoints + 10);
    };
    this.firstSpecialSkillButton.clickHandler = (event) => {
      event.stopPropagation();
      selectedSkill = (target) => this.singleHeal(target);
      activeFighters.forEach((fighter) => {
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
    };

    this.firstSpecialSkill.count = 0;
    this.secondSpecialSkillButton.clickHandler = (event) => {
      event.stopPropagation();
      selectedSkill = (target) => this.teamHeal(target);
      activeFighters.forEach((fighter) => {
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
    };

    this.secondSpecialSkill.count = 0;
  }

  singleHeal(target) {
    preAttackSpecial(this);
    healTarget(this, target, 1);
    postAttackSpecial(this);
    this.firstSpecialSkill.count = 4;
    endOfTurn(this);
  }

  teamHeal(target) {
    preAttackSpecial(this);
    healTeam(this, target, 0.3);
    postAttackSpecial(this);
    this.secondSpecialSkill.count = 6;
    endOfTurn(this);
  }
}

class Hunter extends Water {
  constructor(name, team) {
    super(name, team);
    this.classHitPoints = 150 + this.typeHitPoints;
    this.currentHitPoints = this.classHitPoints;
    this.classAttack = 105 + this.typeAttack;
    this.attackMultiplier = () => {
      if (this.attackBuff.active) {
        return 1.2;
      } else if (this.attackDebuff.active) {
        return 0.8;
      } else {
        return 1;
      }
    };
    this.currentAttack = () => {
      return Math.floor(this.classAttack * this.attackMultiplier());
    };
    this.classDefense = 20 + this.typeDefense;
    this.defenseMultiplier = () => {
      if (this.defenseBuff.active) {
        return 1.6;
      } else if (this.defenseDebuff.active) {
        return 1;
      } else {
        return 1.3;
      }
    };
    this.currentDefense = () => {
      return Math.floor(this.classDefense * this.defenseMultiplier());
    };
    this.classSpeed = 11 + this.typeSpeed;
    this.speedMultiplier = () => {
      if (this.speedBuff.active) {
        return 1.3;
      } else if (this.speedDebuff.active) {
        return 0.7;
      } else {
        return 1;
      }
    };
    this.currentSpeed = () => {
      return Math.floor(this.classSpeed * this.speedMultiplier());
    };
    this.defensiveSkill = {
      active: true,
      count: 0,
      cooldown: 0,
      skill: (attacker) => {
        attackTarget(this, attacker, 0.5, this.defenseAvoidance);
      },
    };
    this.firstSpecialSkillButton.clickHandler = (event) => {
      event.stopPropagation();
      selectedSkill = (target) => this.skillPushback(target);
      activeFighters.forEach((fighter) => {
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
    };

    this.firstSpecialSkill.count = 0;
    this.secondSpecialSkillButton.clickHandler = (event) => {
      event.stopPropagation();
      selectedSkill = (target) => this.setTraps(target);
      activeFighters.forEach((fighter) => {
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
    };

    this.secondSpecialSkill.count = 0;
  }

  skillPushback(target) {
    preAttackSpecial(this);
    increaseCooldowns(this, target);
    postAttackSpecial(this);
    this.firstSpecialSkill.count = 4;
    endOfTurn(this);
  }

  setTraps(target) {
    preAttackSpecial(this);
    debuffTeam(this, target, target.stunDebuff, 1, 0.2);
    debuffTeam(this, target, target.speedDebuff, 1, 0.2);
    debuffTeam(this, target, target.attackDebuff, 1, 0.2);
    debuffTeam(this, target, target.defenseDebuff, 1, 0.2);
    debuffTeam(this, target, target.burnDebuff, 1, 0.2);
    postAttackSpecial(this);
    this.secondSpecialSkill.count = 6;
    endOfTurn(this);
  }
}

class Mage extends Fire {
  constructor(name, team) {
    super(name, team);
    this.classHitPoints = 125 + this.typeHitPoints;
    this.currentHitPoints = this.classHitPoints;
    this.classAttack = 120 + this.typeAttack;
    this.attackMultiplier = () => {
      if (this.attackBuff.active) {
        return 1.2;
      } else if (this.attackDebuff.active) {
        return 0.8;
      } else {
        return 1;
      }
    };
    this.currentAttack = () => {
      return Math.floor(this.classAttack * this.attackMultiplier());
    };
    this.classDefense = 15 + this.typeDefense;
    this.defenseMultiplier = () => {
      if (this.defenseBuff.active) {
        return 1.6;
      } else if (this.defenseDebuff.active) {
        return 1;
      } else {
        return 1.3;
      }
    };
    this.currentDefense = () => {
      return Math.floor(this.classDefense * this.defenseMultiplier());
    };
    this.classSpeed = 9 + this.typeSpeed;
    this.speedMultiplier = () => {
      if (this.speedBuff.active) {
        return 1.3;
      } else if (this.speedDebuff.active) {
        return 0.7;
      } else {
        return 1;
      }
    };
    this.currentSpeed = () => {
      return Math.floor(this.classSpeed * this.speedMultiplier());
    };
    this.defensiveSkill = {
      active: true,
      count: 0,
      cooldown: 0,
      skill: (attacker) => {
        debuffTarget(this, attacker, attacker.stunDebuff, 1, 0.25);
      },
    };
    this.firstSpecialSkillButton.clickHandler = (event) => {
      event.stopPropagation();
      selectedSkill = (target) => this.promote(target);
      activeFighters.forEach((fighter) => {
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
    };

    this.firstSpecialSkill.count = 0;
    this.secondSpecialSkillButton.clickHandler = (event) => {
      event.stopPropagation();
      selectedSkill = (target) => this.fireStorm(target);
      activeFighters.forEach((fighter) => {
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
    };

    this.secondSpecialSkill.count = 0;
  }

  promote(target) {
    preAttackSpecial(this);
    buffTarget(this, target, target.attackBuff, 2, 1);
    boostTarget(target, 100);
    postAttackSpecial(this);
    this.firstSpecialSkill.count = 4;
    endOfTurn(this);
  }

  fireStorm(target) {
    preAttackSpecial(this);
    attackTeam(this, target, 0.5, 0.6);
    attackTeam(this, target, 0.5, 0.6);
    attackTeam(this, target, 0.5, 0.6);
    postAttackSpecial(this);
    this.secondSpecialSkill.count = 6;
    endOfTurn(this);
  }
}

const warriorDiv = document.getElementById("calvin");
const calvin = new Warrior("calvin", "Team 1");
warriorDiv.fighter = calvin;
warriorDiv.clickHandler = () => {
  if (selectedSkill) {
    selectedSkill(warriorDiv.fighter);
    selectedSkill = null;
  }
};

const scholarDiv = document.getElementById("felix");
const felix = new Scholar("felix", "Team 1");
scholarDiv.fighter = felix;
scholarDiv.clickHandler = () => {
  if (selectedSkill) {
    selectedSkill(scholarDiv.fighter);
    selectedSkill = null;
  }
};

const rogueDiv = document.getElementById("clara");
const clara = new Rogue("clara", "Team 1");
rogueDiv.fighter = clara;
rogueDiv.clickHandler = () => {
  if (selectedSkill) {
    selectedSkill(rogueDiv.fighter);
    selectedSkill = null;
  }
};

const druidDiv = document.getElementById("fiona");
const fiona = new Druid("fiona", "Team 2");
druidDiv.fighter = fiona;
druidDiv.clickHandler = () => {
  if (selectedSkill) {
    selectedSkill(druidDiv.fighter);
    selectedSkill = null;
  }
};

const hunterDiv = document.getElementById("alex");
const alex = new Hunter("alex", "Team 2");
hunterDiv.fighter = alex;
hunterDiv.clickHandler = () => {
  if (selectedSkill) {
    selectedSkill(hunterDiv.fighter);
    selectedSkill = null;
  }
};

const mageDiv = document.getElementById("maeve");
const maeve = new Mage("maeve", "Team 2");
mageDiv.fighter = maeve;
mageDiv.clickHandler = () => {
  if (selectedSkill) {
    selectedSkill(mageDiv.fighter);
    selectedSkill = null;
  }
};

let allFighters = [calvin, felix, clara, fiona, alex, maeve];
let activeFighters = allFighters;
let inactiveFighters = [];

let readyFighters = [];
let currentFighter;

function buffCountTracker(fighter) {
  const buffs = ["speedBuff", "attackBuff", "defenseBuff"];

  buffs.forEach((buff) => {
    if (fighter[buff].count > 0) {
      fighter[buff].count--;
    }
    if (fighter[buff].count === 0) {
      fighter[buff].active = false;
    }
  });
}

function debuffCountTracker(fighter) {
  const debuffs = [
    "stunDebuff",
    "defenseDebuff",
    "attackDebuff",
    "speedDebuff",
  ];

  debuffs.forEach((debuff) => {
    if (fighter[debuff].count > 0) {
      fighter[debuff].count--;
    }
    if (fighter[debuff].count === 0) {
      fighter[debuff].active = false;
    }
  });
}

function skillCooldownTracker(fighter) {
  const skills = [
    "innateSpecial",
    "startOfTurnSpecial",
    "preAttackSpecial",
    "firstSkill",
    "secondSkill",
    "thirdSkill",
    "firstSpecialSkill",
    "secondSpecialSkill",
    "postAttackSpecial",
    "endOfTurnSpecial",
  ];

  skills.forEach((skill) => {
    if (fighter[skill].count > 0) {
      fighter[skill].count--;
      let skillCooldown = document.querySelector(
        `#${fighter.name} .${skill}-cd`
      );
      {
        if (skillCooldown) {
          skillCooldown.style.display = "block";

          let skillCooldownText = document.querySelector(
            `#${fighter.name} .${skill}-cd-text`
          );
          skillCooldownText.textContent = fighter[skill].count;
        }
      }
    }
  });

  skills.forEach((skill) => {
    if (fighter[skill].count === 0) {
      let skillCooldown = document.querySelector(
        `#${fighter.name} .${skill}-cd`
      );
      {
        if (skillCooldown) {
          skillCooldown.style.display = "none";

          let skillCooldownText = document.querySelector(
            `#${fighter.name} .${skill}-cd-text`
          );
          skillCooldownText.textContent = fighter[skill].count;
        }
      }
    }
  });
}

const startBattleButton = document.getElementById("start-battle");

startBattleButton.addEventListener("click", () => {
  startBattleButton.style.display = "none";
  const logDisplay = document.getElementById("log");
  logDisplay.style.display = "block";
  refreshUI();
  nextTurn();
});

function tick() {
  activeFighters.forEach((fighter) => {
    fighter.initiative += fighter.currentSpeed();
  });
  refreshUI();
  nextTurn();
}

function nextTurn() {
  readyFighters = activeFighters.filter((fighter) => fighter.initiative >= 100);

  if (readyFighters.length === 0) {
    tick();
  } else {
    currentFighter = determineFighter(readyFighters);
    currentFighter.initiative = 0;
    startOfTurn(currentFighter);
  }
}

function determineFighter() {
  readyFighters.sort((a, b) => b.initiative - a.initiative);
  return readyFighters[0];
}

function attackTarget(fighter, target, damage, blocking) {
  if (fighter.type === "Water" && target.type === "Fire") {
    damage = damage * 1.1;
  }
  if (fighter.type === "Fire" && target.type === "Earth") {
    damage = damage * 1.1;
  }

  if (fighter.type === "Earth" && target.type === "Water") {
    damage = damage * 1.1;
  }

  if (fighter.type === "Water" && target.type === "Earth") {
    damage = damage * 0.9;
  }

  if (fighter.type === "Fire" && target.type === "Water") {
    damage = damage * 0.9;
  }

  if (fighter.type === "Earth" && target.type === "Fire") {
    damage = damage * 0.9;
  }

  let attackRating = Math.floor(fighter.currentAttack() * damage);
  let defenseRating = Math.floor(target.currentDefense() * blocking);
  let damageDealt;

  if (attackRating > defenseRating) {
    damageDealt = attackRating - defenseRating;
  } else {
    damageDealt = 5;
  }
  target.currentHitPoints = target.currentHitPoints - damageDealt;
  updateLog(
    `${fighter.name} hit ${target.name} for ${damageDealt} damage`,
    "red"
  );
  targetHit(target);

  if (target.currentHitPoints > 0) {
    if (target.defensiveSkill.active && target.defensiveSkill.skill) {
      target.defensiveSkill.skill(fighter);
    }
  }
}

function attackTeam(fighter, target, damage, blocking) {
  [...activeFighters].forEach((defender) => {
    if (defender.team === target.team) {
      if (fighter.type === "Water" && defender.type === "Fire") {
        damage = damage * 1.1;
      }
      if (fighter.type === "Fire" && defender.type === "Earth") {
        damage = damage * 1.1;
      }
      if (fighter.type === "Earth" && defender.type === "Water") {
        damage = damage * 1.1;
      }

      if (fighter.type === "Water" && defender.type === "Earth") {
        damage = damage * 0.9;
      }
      if (fighter.type === "Fire" && defender.type === "Water") {
        damage = damage * 0.9;
      }
      if (fighter.type === "Earth" && defender.type === "Fire") {
        damage = damage * 0.9;
      }

      let attackRating = Math.floor(fighter.currentAttack() * damage);
      let defenseRating = Math.floor(defender.currentDefense() * blocking);
      let damageDealt;
      if (attackRating > defenseRating) {
        damageDealt = attackRating - defenseRating;
      } else {
        damageDealt = 5;
      }
      defender.currentHitPoints = defender.currentHitPoints - damageDealt;

      updateLog(
        `${fighter.name} hit ${defender.name} for ${damageDealt} damage`,
        "red"
      );
      targetHit(defender);

      if (defender.currentHitPoints > 0) {
        if (defender.defensiveSkill.active && defender.defensiveSkill.skill) {
          defender.defensiveSkill.skill(fighter);
        }
      }
    }
  });
}

function healTarget(fighter, target, healRating) {
  let healAmount = Math.floor(target.classHitPoints * healRating);
  target.currentHitPoints = target.currentHitPoints + healAmount;
  if (target.currentHitPoints > target.classHitPoints) {
    target.currentHitPoints = target.classHitPoints;
  }
  targetBuffed(target);
  if (target === fighter) {
    updateLog(`${fighter.name} healed themself for ${healAmount}`, "green");
  } else {
    updateLog(
      `${fighter.name} healed ${target.name} for ${healAmount}`,
      "green"
    );
  }
}

function healTeam(fighter, target, healRating) {
  let healAmount = Math.floor(target.classHitPoints * healRating);
  activeFighters.forEach((healTarget) => {
    if (healTarget.team === target.team) {
      healTarget.currentHitPoints = healTarget.currentHitPoints + healAmount;
      if (healTarget.currentHitPoints > healTarget.classHitPoints) {
        healTarget.currentHitPoints = healTarget.classHitPoints;
      }
      targetBuffed(healTarget);
      if (healTarget === fighter) {
        updateLog(`${fighter.name} healed themself for ${healAmount}`, "green");
      } else {
        updateLog(
          `${fighter.name} healed ${healTarget.name} for ${healAmount}`,
          "green"
        );
      }
    }
  });
}

function preAttackSpecial(fighter) {
  if (fighter.preAttackSpecial.active && fighter.preAttackSpecial.skill) {
    fighter.preAttackSpecial.skill();
    fighter.preAttackSpecial.count = fighter.preAttackSpecial.cooldown;
  }
}

function postAttackSpecial(fighter) {
  if (fighter.postAttackSpecial.active && fighter.postAttackSpecial.skill) {
    fighter.postAttackSkill.skill();
    fighter.postAttackSpecial.count = fighter.postAttackSpecial.cooldown;
  }
}

function endOfTurnSpecialSkill(fighter) {
  if (fighter.endOfTurnSpecial.active && fighter.endOfTurnSpecial.skill) {
    fighter.endOfTurnSpecial.skill();
    fighter.endOfTurnSpecial.count = fighter.endOfTurnSpecial.cooldown;
  }
}

function startOfTurnSpecialSkill(fighter) {
  if (fighter.startOfTurnSpecial.active && fighter.startOfTurnSpecial.skill) {
    fighter.startOfTurnSpecial.skill();
    fighter.startOfTurnSpecial.count = fighter.startOfTurnSpecial.cooldown;
  }
}
refreshCount = 1;

function refreshUI() {
  console.log("refreshing UI" + refreshCount);
  refreshCount++;
  allFighters.forEach((fighter) => {
    let fighterHitpoints = document.querySelector(
      `#${fighter.name} .hitpoints`
    );
    fighterHitpoints.textContent = `${fighter.currentHitPoints} / ${fighter.classHitPoints}`;

    const currentHitPoints = fighter.currentHitPoints;
    const classHitPoints = fighter.classHitPoints;
    const healthPercentage = (currentHitPoints / classHitPoints) * 100;

    let healthBar = document.querySelector(
      `#${fighter.name} .hitpoints-progress`
    );
    healthBar.style.width = `${healthPercentage}%`;
    let fighterAttack = document.querySelector(`#${fighter.name} .attack`);
    let fighterAttackBuff = document.querySelector(
      `#${fighter.name} .attack-buff`
    );

    let fighterAttackDebuff = document.querySelector(
      `#${fighter.name} .attack-debuff`
    );
    fighterAttackBuff.style.display = fighter.attackBuff.active
      ? "block"
      : "none";
    fighterAttackDebuff.style.display = fighter.attackDebuff.active
      ? "block"
      : "none";
    fighterAttack.textContent = `Attack: ${fighter.currentAttack()}`;

    let fighterDefense = document.querySelector(`#${fighter.name} .defense`);
    let fighterDefenseBuff = document.querySelector(
      `#${fighter.name} .defense-buff`
    );
    let fighterDefenseDebuff = document.querySelector(
      `#${fighter.name} .defense-debuff`
    );
    fighterDefenseBuff.style.display = fighter.defenseBuff.active
      ? "block"
      : "none";
    fighterDefenseDebuff.style.display = fighter.defenseDebuff.active
      ? "block"
      : "none";
    fighterDefense.textContent = `Defense: ${fighter.currentDefense()}`;

    let turnBar = document.querySelector(
      `#${fighter.name} .initiative-progress`
    );
    if (fighter.initiative < 100) {
      turnBar.style.width = `${fighter.initiative}%`;
    } else {
      turnBar.style.width = `100`;
    }

    let fighterSpeedBuff = document.querySelector(
      `#${fighter.name} .speed-buff`
    );
    let fighterSpeedDebuff = document.querySelector(
      `#${fighter.name} .speed-debuff`
    );
    fighterSpeedBuff.style.display = fighter.speedBuff.active
      ? "block"
      : "none";
    fighterSpeedDebuff.style.display = fighter.speedDebuff.active
      ? "block"
      : "none";
    let fighterBurnDebuff = document.querySelector(
      `#${fighter.name} .burn-debuff`
    );
    fighterBurnDebuff.style.display = fighter.burnDebuff.active
      ? "block"
      : "none";

    let fighterStunDebuff = document.querySelector(
      `#${fighter.name} .stun-debuff`
    );
    fighterStunDebuff.style.display = fighter.stunDebuff.active
      ? "block"
      : "none";

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
      fighterDiv.style.opacity = ".5";
    });
  });
}

function updateLog(message, color) {
  let log = document.getElementById("log");
  let newMessage = document.createElement("p");
  newMessage.textContent = message;
  newMessage.style.color = color;
  log.appendChild(newMessage);
  log.scrollTop = log.scrollHeight;
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

function targetHealed(target) {
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

function targetHit(target) {
  let targetHitOverlay = document.querySelector(`#${target.name} .hit-overlay`);
  setTimeout(() => {
    targetHitOverlay.style.display = "block";
  }, 200);
  setTimeout(() => {
    targetHitOverlay.style.display = "none";
  }, 1000);

  if (target.currentHitPoints <= 0) {
    targetKilled(target);
  }

  refreshUI();
}

function targetKilled(target) {
  target.currentHitPoints = 0;
  let targetDeadOverlay = document.querySelector(
    `#${target.name} .dead-overlay`
  );
  targetDeadOverlay.style.display = "block";
  refreshUI();

  let index = activeFighters.indexOf(target);
  if (index > -1) {
    activeFighters.splice(index, 1);
  }
  inactiveFighters.push(target);
  updateLog(`${target.name} has been defeated!`, "red");
}

function targetDebuffed(target) {
  let targetHitOverlay = document.querySelector(`#${target.name} .hit-overlay`);
  setTimeout(() => {
    targetHitOverlay.style.display = "block";
  }, 200);
  setTimeout(() => {
    targetHitOverlay.style.display = "none";
  }, 1000);
  refreshUI();
}

function buffTarget(fighter, target, buff, duration, chance) {
  const random = Math.random();
  if (random <= chance) {
    buff.active = true;
    buff.count = duration;
    updateLog(
      `${fighter.name} increased ${target.name}'s ${buff.skill}`,
      "white"
    );
    targetBuffed(target);
  }
}

function buffTeam(fighter, target, buff, duration, chance) {
  activeFighters.forEach((teammate) => {
    if (teammate.team === target.team) {
      const random = Math.random();
      if (random <= chance) {
        if (buff.skill === "Speed") {
          teammate.speedBuff.active = true;
          teammate.speedBuff.count = duration;
          updateLog(
            `${fighter.name} increased ${teammate.name}'s ${buff.skill}`,
            "white"
          );
        } else if (buff.skill === "Attack") {
          teammate.attackBuff.active = true;
          teammate.attackBuff.count = duration;
          updateLog(
            `${fighter.name} increased ${teammate.name}'s ${buff.skill}`,
            "white"
          );
        } else if (buff.skill === "Defense") {
          teammate.defenseBuff.active = true;
          teammate.defenseBuff.count = duration;
          updateLog(
            `${fighter.name} increased ${teammate.name}'s ${buff.skill}`,
            "white"
          );
        }
        targetBuffed(teammate);
      }
    }
  });
}

function debuffTarget(fighter, target, debuff, duration, chance) {
  const random = Math.random();
  if (random <= chance) {
    debuff.active = true;
    debuff.count = duration;
    if (debuff.skill === "Stun") {
      updateLog(`${fighter.name} stunned ${target.name}`, "white");
    } else if (debuff.skill === "Burn") {
      updateLog(`${fighter.name} burned ${target.name}`, "white");
    } else {
      updateLog(
        `${fighter.name} lowered ${target.name}'s ${debuff.skill}`,
        "white"
      );
    }
    targetDebuffed(target);
  }
}

function debuffTeam(fighter, target, debuff, duration, chance) {
  activeFighters.forEach((defender) => {
    const random = Math.random();
    if (random <= chance) {
      if (defender.team === target.team) {
        if (debuff.skill === "Stun") {
          defender.stunDebuff.active = true;
          defender.stunDebuff.count = duration;
          updateLog(`${fighter.name} stunned ${defender.name}`, "white");
        } else if (debuff.skill === "Burn") {
          defender.burnDebuff.active = true;
          defender.burnDebuff.count = duration;
          updateLog(`${fighter.name} burned ${defender.name}`, "white");
        } else if (debuff.skill === "Speed") {
          defender.speedDebuff.active = true;
          defender.speedDebuff.count = duration;
          updateLog(
            `${fighter.name} lowered ${defender.name}'s ${debuff.skill}`,
            "white"
          );
        } else if (debuff.skill === "Attack") {
          defender.attackDebuff.active = true;
          defender.attackDebuff.count = duration;
          updateLog(
            `${fighter.name} lowered ${defender.name}'s ${debuff.skill}`,
            "white"
          );
        } else if (debuff.skill === "Defense") {
          defender.defenseDebuff.active = true;
          defender.defenseDebuff.count = duration;
          updateLog(
            `${fighter.name} lowered ${defender.name}'s ${debuff.skill}`,
            "white"
          );
        }
        targetDebuffed(defender);
      }
    }
  });
}

function cleanseTarget(target) {
  target.attackDebuff = { active: false, count: 0, skill: "Attack" };
  target.defenseDebuff = { active: false, count: 0, skill: "Defense" };
  target.speedDebuff = { active: false, count: 0, skill: "Speed" };
  target.stunDebuff = { active: false, count: 0, skill: "Stun" };
  target.burnDebuff = { active: false, count: 0, skill: "Burn" };
  updateLog(`${target.name} has been cleansed`, "white");
  targetBuffed(target);
}

function cleanseTeam(target) {
  activeFighters.forEach((fighter) => {
    if (fighter.team === target.team) {
      fighter.attackDebuff = { active: false, count: 0, skill: "Attack" };
      fighter.defenseDebuff = { active: false, count: 0, skill: "Defense" };
      fighter.speedDebuff = { active: false, count: 0, skill: "Speed" };
      fighter.stunDebuff = { active: false, count: 0, skill: "Stun" };
      fighter.burnDebuff = { active: false, count: 0, skill: "Burn" };
      updateLog(`${target.name} has been cleansed`, "white");
      targetBuffed(fighter);
    }
  });
}

function refreshTarget(target) {
  const skills = [
    "innateSpecial",
    "startOfTurnSpecial",
    "preAttackSpecial",
    "firstSkill",
    "secondSkill",
    "thirdSkill",
    "firstSpecialSkill",
    "secondSpecialSkill",
    "postAttackSpecial",
    "endOfTurnSpecial",
  ];

  skills.forEach((skill) => {
    target[skill].count = 0;

    let skillCooldown = document.querySelector(`#${target.name} .${skill}-cd`);
    {
      if (skillCooldown) {
        skillCooldown.style.display = "none";

        let skillCooldownText = document.querySelector(
          `#${target.name} .${skill}-cd-text`
        );
        skillCooldownText.textContent = target[skill].count;
      }
    }
  });
  targetBuffed(target);
}

function refreshTeam(target) {
  activeFighters.forEach((fighter) => {
    if (fighter.team === target.team) {
      const skills = [
        "innateSpecial",
        "startOfTurnSpecial",
        "preAttackSpecial",
        "firstSkill",
        "secondSkill",
        "thirdSkill",
        "firstSpecialSkill",
        "secondSpecialSkill",
        "postAttackSpecial",
        "endOfTurnSpecial",
      ];

      skills.forEach((skill) => {
        fighter[skill].count = 0;

        let skillCooldown = document.querySelector(
          `#${fighter.name} .${skill}-cd`
        );
        {
          if (skillCooldown) {
            skillCooldown.style.display = "none";

            let skillCooldownText = document.querySelector(
              `#${fighter.name} .${skill}-cd-text`
            );
            skillCooldownText.textContent = fighter[skill].count;
          }
        }
      });
      targetBuffed(fighter);
    }
  });
}

function stripTarget(target) {
  target.attackBuff = { active: false, count: 0, skill: "Attack" };
  target.defenseBuff = { active: false, count: 0, skill: "Defense" };
  target.speedBuff = { active: false, count: 0, skill: "Speed" };
  targetDebuffed(target);
}

function stripTeam(target) {
  activeFighters.forEach((fighter) => {
    if (fighter.team === target.team) {
      fighter.attackBuff = { active: false, count: 0, skill: "Attack" };
      fighter.defenseBuff = { active: false, count: 0, skill: "Defense" };
      fighter.speedBuff = { active: false, count: 0, skill: "Speed" };
      targetDebuffed(fighter);
    }
  });
}

function increaseCooldowns(fighter, target) {
  const skills = [
    "innateSpecial",
    "startOfTurnSpecial",
    "preAttackSpecial",
    "secondSkill",
    "thirdSkill",
    "firstSpecialSkill",
    "secondSpecialSkill",
    "postAttackSpecial",
    "endOfTurnSpecial",
  ];

  skills.forEach((skill) => {
    target[skill].count++;
    let skillCooldown = document.querySelector(`#${target.name} .${skill}-cd`);
    {
      if (skillCooldown) {
        skillCooldown.style.display = "block";

        let skillCooldownText = document.querySelector(
          `#${target.name} .${skill}-cd-text`
        );
        skillCooldownText.textContent = target[skill].count;
      }
    }
  });
  updateLog(`${fighter.name} increased ${target.name}'s skill cooldowns`);
  targetDebuffed(target);
}

function endOfTurn(fighter) {
  let targetActiveBorder = document.getElementById(fighter.name);
  targetActiveBorder.style.borderColor = "black";
  buffCountTracker(fighter);
  debuffCountTracker(fighter);
  skillCooldownTracker(fighter);
  endOfTurnSpecialSkill(fighter);
  deactivateSkillButtons(fighter);
  tick();
}

function startOfTurn(fighter) {
  startOfTurnSpecialSkill(fighter);
  let fighterActiveBorder = document.getElementById(fighter.name);
  fighterActiveBorder.style.borderColor = "white";
  activateSkillButtons(fighter);
  startOfTurnDebuffs(fighter);
}

function startOfTurnDebuffs(fighter) {
  if (fighter.burnDebuff.active) {
    updateLog(`${fighter.name} is burning and taking damage`, "white");
    fighter.currentHitPoints =
      fighter.currentHitPoints - Math.floor(fighter.classHitPoints * 0.1);
    fighter.burnDebuff.count--;
    if (fighter.burnDebuff === 0) {
      fighter.burnDebuff.active = false;
    }
  }

  let fighterOpacity = document.getElementById(fighter.name);
  fighterOpacity.style.opacity = "1";

  if (fighter.stunDebuff.active) {
    updateLog(`${fighter.name} is stunned and cannot move`, "white");
    endOfTurn(fighter);
  }
}

function deactivateSkillButtons(fighter) {
  fighter.firstSkillButton.removeEventListener(
    "click",
    fighter.firstSkillButton.clickHandler
  );
  fighter.secondSkillButton.removeEventListener(
    "click",
    fighter.secondSkillButton.clickHandler
  );
  fighter.thirdSkillButton.removeEventListener(
    "click",
    fighter.thirdSkillButton.clickHandler
  );
  fighter.firstSpecialSkillButton.removeEventListener(
    "click",
    fighter.firstSpecialSkillButton.clickHandler
  );
  fighter.secondSpecialSkillButton.removeEventListener(
    "click",
    fighter.secondSpecialSkillButton.clickHandler
  );
  refreshUI();
}

function activateSkillButtons(fighter) {
  fighter.firstSkillButton.addEventListener(
    "click",
    fighter.firstSkillButton.clickHandler
  );
  fighter.secondSkillButton.addEventListener(
    "click",
    fighter.secondSkillButton.clickHandler
  );
  fighter.thirdSkillButton.addEventListener(
    "click",
    fighter.thirdSkillButton.clickHandler
  );
  fighter.firstSpecialSkillButton.addEventListener(
    "click",
    fighter.firstSpecialSkillButton.clickHandler
  );
  fighter.secondSpecialSkillButton.addEventListener(
    "click",
    fighter.secondSpecialSkillButton.clickHandler
  );
  refreshUI();
}

function boostTarget(target, amount) {
  target.initiative = target.initiative + amount;
}

function boostTeam(target, amount) {
  activeFighters.forEach((fighter) => {
    if (fighter.team === target.team) {
      fighter.initiative = fighter.initiative + amount;
    }
  });
}
