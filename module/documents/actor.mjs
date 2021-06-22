export class NaheulbeukActor extends Actor {

    prepareData() {
        console.log("---------------- Prepare data");
        super.prepareData();
        //this.data.data.abilities
        console.log(this);

        this.data.data.abilities.ADR.bonus = 0;
        this.data.data.abilities.CHA.bonus = 0;
        this.data.data.abilities.COU.bonus = 0;
        this.data.data.abilities.FO.bonus = 0;
        this.data.data.abilities.INT.bonus = 0;
        this.data.data.abilities.AT.bonus = 0;
        this.data.data.abilities.PRD.bonus = 0;
        this.data.data.abilities.PR.bonus = 0;
        this.data.data.abilities.PRMag.bonus = 0;
        this.data.data.abilities.PI.bonus = 0;
        this.data.data.abilities.PS.bonus = 0;
        this.data.data.abilities.PI.total = 0;
        this.data.data.abilities.PS.total = 0;
        console.warn(this);
        console.log(this);

        for (let index = 0; index < this.data.items.size; index++) {

            if (this.data.items.contents[index].data.type != "spell" && this.data.items.contents[index].data.type != "skill" && this.data.items.contents[index].data.type != "object") {
                console.log(this.data.data.abilities);
                console.log(this.data.items.contents[index].data.data.abilities);

                this.data.data.abilities.ADR.bonus += this.data.items.contents[index].data.data.abilities.ADR;
                this.data.data.abilities.CHA.bonus += this.data.items.contents[index].data.data.abilities.CHA;
                this.data.data.abilities.COU.bonus += this.data.items.contents[index].data.data.abilities.COU;
                this.data.data.abilities.FO.bonus += this.data.items.contents[index].data.data.abilities.FO;
                this.data.data.abilities.INT.bonus += this.data.items.contents[index].data.data.abilities.INT;
                this.data.data.abilities.PI.bonus += this.data.items.contents[index].data.data.abilities.PI;
                this.data.data.abilities.PS.bonus += this.data.items.contents[index].data.data.abilities.PS;

                if (this.data.items.contents[index].data.type == "weapon") {
                    this.data.data.abilities.AT.bonus += this.data.items.contents[index].data.data.modAT;
                    this.data.data.abilities.PRD.bonus += this.data.items.contents[index].data.data.modPRD;
                }

                if (this.data.items.contents[index].data.type == "armor") {
                    this.data.data.abilities.PR.bonus += this.data.items.contents[index].data.data.PR;
                    this.data.data.abilities.PRMag.bonus += this.data.items.contents[index].data.data.PRMag;
                }
            }
        }
        console.warn(this.data.data.abilities);

        this.data.data.abilities.MP.total = parseInt(this.data.data.abilities.MP.base) + parseInt(this.data.data.abilities.MP.bonus) + parseInt(this.data.data.abilities.MP.mod);
        this.data.data.abilities.AT.total = parseInt(this.data.data.abilities.AT.base) + parseInt(this.data.data.abilities.AT.bonus) + parseInt(this.data.data.abilities.AT.mod);
        this.data.data.abilities.PRD.total = parseInt(this.data.data.abilities.PRD.base) + parseInt(this.data.data.abilities.PRD.bonus) + parseInt(this.data.data.abilities.PRD.mod);
        this.data.data.abilities.COU.total = parseInt(this.data.data.abilities.COU.base) + parseInt(this.data.data.abilities.COU.bonus) + parseInt(this.data.data.abilities.COU.mod);
        this.data.data.abilities.INT.total = parseInt(this.data.data.abilities.INT.base) + parseInt(this.data.data.abilities.INT.bonus) + parseInt(this.data.data.abilities.INT.mod);
        this.data.data.abilities.CHA.total = parseInt(this.data.data.abilities.CHA.base) + parseInt(this.data.data.abilities.CHA.bonus) + parseInt(this.data.data.abilities.CHA.mod);
        this.data.data.abilities.ADR.total = parseInt(this.data.data.abilities.ADR.base) + parseInt(this.data.data.abilities.ADR.bonus) + parseInt(this.data.data.abilities.ADR.mod);
        this.data.data.abilities.FO.total = parseInt(this.data.data.abilities.FO.base) + parseInt(this.data.data.abilities.FO.bonus) + parseInt(this.data.data.abilities.FO.mod);

        this.data.data.abilities.PR.total = parseInt(this.data.data.abilities.PR.base) + parseInt(this.data.data.abilities.PR.bonus) + parseInt(this.data.data.abilities.PR.mod);
        this.data.data.abilities.PR.total = this.data.data.abilities.PR.total > parseInt(this.data.data.PRMax) ? parseInt(this.data.data.PRMax) : this.data.data.abilities.PR.total;

        this.data.data.abilities.PRMag.total = parseInt(this.data.data.abilities.PRMag.base) + parseInt(this.data.data.abilities.PRMag.bonus) + parseInt(this.data.data.abilities.PRMag.mod);
        this.data.data.abilities.HP.total = parseInt(this.data.data.abilities.HP.base) + parseInt(this.data.data.abilities.HP.bonus);
        this.data.data.abilities.HPMAX.total = parseInt(this.data.data.abilities.HPMAX.base) + parseInt(this.data.data.abilities.HPMAX.bonus);
        this.data.data.abilities.MP.total = parseInt(this.data.data.abilities.MP.base) + parseInt(this.data.data.abilities.MP.bonus);
        this.data.data.abilities.MPMAX.total = parseInt(this.data.data.abilities.MPMAX.base) + parseInt(this.data.data.abilities.MPMAX.bonus);

        this.data.data.abilities.MagPHY.base = Math.round((parseInt(this.data.data.abilities.ADR.total) + parseInt(this.data.data.abilities.INT.total)) / 2 + parseInt(this.data.data.abilities.MagPHY.bonus));
        this.data.data.abilities.MagPHY.total = parseInt(this.data.data.abilities.MagPHY.base) + parseInt(this.data.data.abilities.MagPHY.mod);

        this.data.data.abilities.MagPSY.base = Math.round((parseInt(this.data.data.abilities.CHA.total) + parseInt(this.data.data.abilities.INT.total)) / 2 + parseInt(this.data.data.abilities.MagPSY.bonus));
        this.data.data.abilities.MagPSY.total = parseInt(this.data.data.abilities.MagPSY.base) + parseInt(this.data.data.abilities.MagPSY.mod);

        this.data.data.abilities.ReMag.base = Math.round((parseInt(this.data.data.abilities.COU.total) + parseInt(this.data.data.abilities.INT.total) + parseInt(this.data.data.abilities.FO.total)) / 3 + parseInt(this.data.data.abilities.ReMag.bonus));
        this.data.data.abilities.ReMag.total = parseInt(this.data.data.abilities.ReMag.base) + parseInt(this.data.data.abilities.ReMag.mod);

        this.data.data.abilities.PI.base = (this.data.data.abilities.FO.total - 12) > 0 ? (this.data.data.abilities.FO.total - 12) : 0;
        this.data.data.abilities.PI.base = this.data.data.abilities.FO.total <= 8 ? -1 : this.data.data.abilities.PI.base;
        this.data.data.abilities.PI.total = parseInt(this.data.data.abilities.PI.base) + parseInt(this.data.data.abilities.PI.bonus);

        this.data.data.abilities.PS.base = (this.data.data.abilities.INT.total - 12) > 0 ? (this.data.data.abilities.INT.total - 12) : 0;
        this.data.data.abilities.PS.total = parseInt(this.data.data.abilities.PS.base) + parseInt(this.data.data.abilities.PS.bonus);

        this.data.data.goldTotal = parseInt(this.data.data.gold) + (500 * parseInt(this.data.data.berylium)) + (100 * parseInt(this.data.data.thritil));


    }
}