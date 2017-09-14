var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleTowerCaddy = require('role.towerCaddy');
var roleClaimer = require('role.claimer');
var roleDefender = require('role.defender');
var towerControls = require('tower.controls');
var constructRoads = require('construct.roads');
var handlerOtherRoom = require('handler.otherRoom');
var handlerSpawns = require('handler.spawns');
var handlerArmySpawn = require('handler.armySpawn');

module.exports.loop = function () {
    
    var towers = _.filter(Game.structures, (structure) => structure.structureType == STRUCTURE_TOWER);
    
    for(i=0; i<towers.length; i++) {
        towerControls.attack(towers[i]);
    }


    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'towerCaddy') {
            roleTowerCaddy.run(creep);
        }
        if(creep.memory.role == 'claimer') {
            roleClaimer.run(creep);
        }
        if(creep.memory.role == 'defender') {
            roleDefender.run(creep);
        }
    }
    
    
    for(var i in Game.spawns) {
        var enemies = Game.spawns[i].room.find(FIND_HOSTILE_CREEPS);
        
        if(enemies.length) {
            handlerArmySpawn.run(Game.spawns[i]);
        }
        else {
            handlerSpawns.run(Game.spawns[i]);
        }
    }
    
    
    for(var i in Memory.creeps) {
        if(!Game.creeps[i]) {
            delete Memory.creeps[i];
        }
    }
}