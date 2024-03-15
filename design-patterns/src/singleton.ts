class StatsTracker {
    buttonClicks: number = 0;
    facebookShares: number = 0;
    twitterShares: number = 0;
    widgetViews: number = 0;

    constructor() {
        if(StatsTracker._instance) {
            throw new Error("Cannot initialize singleton class using new");
        }
        StatsTracker._instance = this;
    }

    private static _instance: StatsTracker = new StatsTracker();    // private ctor

    public static get_instance(): StatsTracker {                    // public access only thru static method instance()
        return StatsTracker._instance;
    }
}


function test() {
    let tracker = StatsTracker.get_instance();
    console.log(`Widget views: ${tracker.widgetViews}`);
    console.log(`Twitter shares: ${tracker.twitterShares}`);
}

let tracker = StatsTracker.get_instance();

tracker.widgetViews = 90;
tracker.buttonClicks = 64;
tracker.facebookShares = 20;
tracker.twitterShares = 30;

console.log(`Widget Views: ${tracker.widgetViews}`);
console.log(`Button Clicks: ${tracker.buttonClicks}`);
console.log(`Facebook Shares: ${tracker.facebookShares}`);
console.log(`Twitter Shares: ${tracker.twitterShares}`);

tracker.widgetViews++;
tracker.twitterShares += 2;

test();

// \design-patterns> tsc
// \design-patterns> node .\build\singleton.js
// OUT:
// Widget Views: 90
// Button Clicks: 64
// Facebook Shares: 20
// Twitter Shares: 30
// Widget views: 91
// Twitter shares: 32



