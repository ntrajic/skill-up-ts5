"use strict";
class GameCharactersFactory {
    static getWarrior(level) {
        let warrior;
        if (level < 10) {
            warrior = {
                strength: 18,
                dexterity: 12,
                health: 20,
                magic: 0
            };
        }
        else {
            warrior = {
                strength: 30,
                dexterity: 21,
                health: 32,
                magic: 0
            };
        }
        return warrior;
    }
    static getMage(level) {
        let mage;
        if (level < 10) {
            mage = {
                strength: 0,
                dexterity: 8,
                health: 10,
                magic: 32
            };
        }
        else {
            mage = {
                strength: 2,
                dexterity: 12,
                health: 14,
                magic: 92
            };
        }
        return mage;
    }
}
let warrior = GameCharactersFactory.getWarrior(12);
let mage = GameCharactersFactory.getMage(12);
console.log(`Warrior at level 12: `, warrior);
console.log(`Mage at level 12: `, mage);
// \design-patterns> tsc
// \design-patterns> node .\build\factory.js   
// OUT:  
// Warrior at level 12:  { strength: 30, dexterity: 21, health: 32, magic: 0 }
// Mage at level 12:  { strength: 2, dexterity: 12, health: 14, magic: 92 }
// OUBJECT POOL
// ============
class GameCharactersPool {
    _level;
    _warriorsPool = [];
    _magesPool = [];
    static WARRIORS_POOL_SIZE = 30;
    static MAGES_POOL_SIZE = 20;
    constructor(_level) {
        this._level = _level;
        this.loadWarriorsPool();
        this.loadMagesPool();
    }
    loadMagesPool() {
        for (let i = 0; i < GameCharactersPool.MAGES_POOL_SIZE; i++) {
            this._magesPool.push(GameCharactersFactory.getMage(this._level));
        }
    }
    loadWarriorsPool() {
        for (let i = 0; i < GameCharactersPool.WARRIORS_POOL_SIZE; i++) {
            this._warriorsPool.push(GameCharactersFactory.getWarrior(this._level));
        }
    }
    getPoolItem(pool, reloadFn) {
        let item = pool.pop();
        if (!pool.length) {
            reloadFn();
        }
        return item;
    }
    getWarrior() {
        return this.getPoolItem(this._warriorsPool, this.loadWarriorsPool.bind(this));
    }
    getMage() {
        return this.getPoolItem(this._magesPool, this.loadMagesPool.bind(this));
    }
}
let level = 12;
let pool = new GameCharactersPool(level);
// Load 40 warriors
for (let i = 0; i < 40; i++) {
    console.log(i + 1);
    console.log(pool.getWarrior());
}
// LOAD 40 objects form the pool
// OUT:
// 1
// { strength: 30, dexterity: 21, health: 32, magic: 0 }
// 2
// { strength: 30, dexterity: 21, health: 32, magic: 0 }
// 3
// { strength: 30, dexterity: 21, health: 32, magic: 0 }
// 4
// { strength: 30, dexterity: 21, health: 32, magic: 0 }
// 5
// { strength: 30, dexterity: 21, health: 32, magic: 0 }
// 6
// { strength: 30, dexterity: 21, health: 32, magic: 0 }
// 7
// { strength: 30, dexterity: 21, health: 32, magic: 0 }
// 8
// { strength: 30, dexterity: 21, health: 32, magic: 0 }
// 9
// { strength: 30, dexterity: 21, health: 32, magic: 0 }
// 10
// { strength: 30, dexterity: 21, health: 32, magic: 0 }
// 11
// { strength: 30, dexterity: 21, health: 32, magic: 0 }
// 12
// { strength: 30, dexterity: 21, health: 32, magic: 0 }
// 13
// { strength: 30, dexterity: 21, health: 32, magic: 0 }
// 14
// { strength: 30, dexterity: 21, health: 32, magic: 0 }
// 15
// { strength: 30, dexterity: 21, health: 32, magic: 0 }
// 16
// { strength: 30, dexterity: 21, health: 32, magic: 0 }
// 17
// { strength: 30, dexterity: 21, health: 32, magic: 0 }
// 18
// { strength: 30, dexterity: 21, health: 32, magic: 0 }
// 19
// { strength: 30, dexterity: 21, health: 32, magic: 0 }
// 20
// { strength: 30, dexterity: 21, health: 32, magic: 0 }
// 21
// { strength: 30, dexterity: 21, health: 32, magic: 0 }
// 22
// { strength: 30, dexterity: 21, health: 32, magic: 0 }
// 23
// { strength: 30, dexterity: 21, health: 32, magic: 0 }
// 24
// { strength: 30, dexterity: 21, health: 32, magic: 0 }
// 25
// { strength: 30, dexterity: 21, health: 32, magic: 0 }
// 26
// { strength: 30, dexterity: 21, health: 32, magic: 0 }
// 27
// { strength: 30, dexterity: 21, health: 32, magic: 0 }
// 28
// { strength: 30, dexterity: 21, health: 32, magic: 0 }
// 29
// { strength: 30, dexterity: 21, health: 32, magic: 0 }
// 30
// { strength: 30, dexterity: 21, health: 32, magic: 0 }
// 31
// { strength: 30, dexterity: 21, health: 32, magic: 0 }
// 32
// { strength: 30, dexterity: 21, health: 32, magic: 0 }
// 33
// { strength: 30, dexterity: 21, health: 32, magic: 0 }
// 34
// { strength: 30, dexterity: 21, health: 32, magic: 0 }
// 35
// { strength: 30, dexterity: 21, health: 32, magic: 0 }
// 36
// { strength: 30, dexterity: 21, health: 32, magic: 0 }
// 37
// { strength: 30, dexterity: 21, health: 32, magic: 0 }
// 38
// { strength: 30, dexterity: 21, health: 32, magic: 0 }
// 39
// { strength: 30, dexterity: 21, health: 32, magic: 0 }
// 40
// { strength: 30, dexterity: 21, health: 32, magic: 0 }
