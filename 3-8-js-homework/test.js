// class Test {
//   constructor(name) {
//     this.name = name;
//     this.objectVariable = {
//       active: false,
//       count: 0,
//       skill: (target) => attackTarget(this, target, 1, 2),
//     };
//   }

//   testingShit(target) {
//     externalFunction(this);
//   }
// }

// function externalFunction(attacker) {
//   if (attacker.objectVariable.skill) {
//     attacker.objectVariable.skill();
//   }
// }

// let albert = new Test("Albert");
// let brian = new Test("Brian");

// function attackTarget(fighter, target, damage, blocking) {
//   let attackRating = 5 * damage;
//   let defenseRating = 0 * blocking;
//   let damageDealt = attackRating - defenseRating;
//   if (attackRating > defenseRating) {
//     console.log(damageDealt);
//   }
// }

// albert.testingShit(brian);
