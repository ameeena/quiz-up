const DomainDetails = require('mongoose').model('DomainModel');

exports.updateDomainBasedScore = function(req, res) {

    const domainName = req.body.domainName;
    const testName = req.body.testName;
    const testScore = req.body.pointsScored;
    isTestPresent = false;
    DomainDetails.findOne({ domainName: domainName, tests: { $elemMatch: { testName: testName } } }, 'tests', function(err, results) {
        if (err) {
            res.send(err);
        } else {
            if (results != null) {
                DomainDetails.findOne({ 'tests.testName': testName }).then(domainData => {
                    for (var i = 0; i < domainData.tests.length; i++) {
                        if (domainData.tests[i].testName == testName) {
                            isTestPresent = true;
                            const totalScores = domainData.tests[i].totalScore + testScore
                            const totUser = domainData.tests[i].totalUsers + 1;
                            const avgScores = totalScores / totUser;
                            domainData.tests[i].totalScore = totalScores;
                            domainData.tests[i].totalUsers = totUser;
                            domainData.tests[i].averageScore = avgScores;
                            domainData.save(function(err, resData) {
                                if (err) {
                                    res.send(err);
                                } else {
                                    res.json(resData);
                                }
                            });
                        }
                    }
                });
            } else {
                const totalScores = testScore
                const totUser = 1;
                const avgScores = totalScores / totUser;
                console.log(avgScores);

                var tests = {
                    testName: testName,
                    totalScore: totalScores,
                    totalUsers: totUser,
                    averageScore: avgScores
                }

                DomainDetails.update({ domainName: domainName }, { $push: { tests: tests } }, { safe: true, upsert: true }, function(err, results) {
                    if (err) {
                        console.log(err);
                        res.send(err);
                    } else {
                        console.log("Successful");
                        res.json(results);
                    }
                })
            }
        }
    });


}