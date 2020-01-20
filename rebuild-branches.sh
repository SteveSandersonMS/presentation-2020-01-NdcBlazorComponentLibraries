BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [[ "$BRANCH" != "master" ]]; then
  echo 'Current branch is not master; aborting';
  exit 1;
fi

git branch -f 1-empty-solution `git log --grep="[1]" --format=format:%H`
git branch -f 2-with-sample-projects `git log --grep="[2]" --format=format:%H`
git branch -f 3-with-chartist-files `git log --grep="[3]" --format=format:%H`
git branch -f 4-with-chart-data-types `git log --grep="[4]" --format=format:%H`
git branch -f 5-with-series-component `git log --grep="[5]" --format=format:%H`
git branch -f 6-with-webpack-build `git log --grep="[6]" --format=format:%H`
git branch -f 7-with-azdo-pipeline `git log --grep="[7]" --format=format:%H`
