angular.module('gdgXBoomerang')
.controller('ActivitiesController', function (Config, NavService) {
    var vm = this;
    vm.loading = false;
    NavService.setNavTab(3);
    vm.activities = [];

    var activityList = {
        techTalks: {
            name: 'Tech Talks',
            description: 'These talks are a grassroots-style series of presentation given by various ' +
                'technical experts spanning a wide spectrum of topics in technology and related areas.',
            color: 'purple',
            icon: '/app/images/icons/ic_mic_48px.svg'
        },
        roundTables: {
            name: 'Round Tables',
            description: 'Free-form, community-focused events where all attendees can raise topics for discussion.',
            color: 'darkBlue',
            icon: '/app/images/icons/ic_local_pizza_48px.svg'
        },
        codeLabs: {
            name: 'Code Labs',
            description: 'Specially prepared to provide step-by-step instructions, these events focus on ' +
                'introducing new technology and maximizing hands-on learning.',
            color: 'green',
            icon: '/app/images/icons/ic_code_48px.svg'
        },
        devFests: {
            name: 'Dev Fests',
            description: 'GDG Dev Fests are large scale, community-run events that offer speaker sessions ' +
                'across single or multiple product areas, hackathons, code labs, and more...',
            color: 'deepBlue',
            icon: '/app/images/icons/ic_event_48px.svg'
        },
        appClinics: {
            name: 'App Clinics',
            description: 'These community events bring together developers, designers, testers, and ' +
                'usability experts to evaluate specific apps with a focus on constructive criticism, ' +
                'problem solving, and collaboration.',
            color: 'yellow',
            icon: '/app/images/icons/ic_local_hospital_48px.svg'
        },
        panels: {
            name: 'Panels',
            description: 'These events bring together multiple experts on a topic. The formats can vary from ' +
                'moderator-led Q&A, debate, focused or free-form discussion, to audience Q&A.',
            color: 'lightPurple',
            icon: '/app/images/icons/ic_people_48px.svg'
        },
        hackathons: {
            name: 'Hackathons',
            description: 'Events where cross-disciplined teams collaborate intensively on specific projects ' +
                'or challenges. They often involve timed demonstrations and competition for prizes.',
            color: 'red',
            icon: '/app/images/icons/ic_timer_48px.svg'
        },
        designSprints: {
            name: 'Design Sprints',
            description: 'Intense, focused, collaborative brainstorming events where product design is key. ' +
                'Iterate through the various phases of understanding, sketching, deciding, prototyping, ' +
                'and testing.',
            color: 'pink',
            icon: '/app/images/icons/ic_directions_run_48px.svg'
        }
    };

    if (Config.activities.techTalks) {
        vm.activities.push(activityList.techTalks);
    }
    if (Config.activities.roundTables) {
        vm.activities.push(activityList.roundTables);
    }
    if (Config.activities.codeLabs) {
        vm.activities.push(activityList.codeLabs);
    }
    if (Config.activities.devFests) {
        vm.activities.push(activityList.devFests);
    }
    if (Config.activities.appClinics) {
        vm.activities.push(activityList.appClinics);
    }
    if (Config.activities.panels) {
        vm.activities.push(activityList.panels);
    }
    if (Config.activities.hackathons) {
        vm.activities.push(activityList.hackathons);
    }
    if (Config.activities.designSprints) {
        vm.activities.push(activityList.designSprints);
    }
});
