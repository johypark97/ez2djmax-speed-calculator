#!/bin/bash

# =======================
# -------- const --------
# =======================

BRANCH_NAME=gh-pages
DIST_DIR=out
REMOTE_NAME=origin

# ==========================
# -------- function --------
# ==========================

function confirmYesNo()
{
    local value
    while :; do
        read -p "$1 (y/N): " value
        value=${value:-n}
        case $value in
            Y | y) return $( true ) ;;
            N | n) return $( false ) ;;
            *) echo "invalid input: $value" ;;
        esac
    done
}

# ======================
# -------- main --------
# ======================

function main()
{
    if [[ -n $( git status --porcelain ) ]]; then
        echo "The project workspace is not clean."
        echo
        git status

        exit 1
    fi

    # The exit code will always be zero if the local declaration and the command
    # substitution are not separated.
    local version; version=$( node ./scripts/getVersion.js )
    if (( $? )); then
        echo "Error: cannot get the project version."
        exit 1
    fi

    local githubPagesUrl
    while :; do
        local username
        local repository

        read -p "GitHub username to deploy this project: " username
        read -p "GitHub repository name of this project: " repository

        githubPagesUrl="https://$username.github.io/$repository"
        echo
        echo "Created GitHub Pages url is '$githubPagesUrl/'"

        confirmYesNo "Do you want to distribute to this URL?" && break
        echo
    done

    local commitMessage="Deploy v$version"

    echo
    echo "-------- Last commit --------"
    echo "$( git log -1 )"
    echo
    echo "-------- Deploy information --------"
    echo "Project version: $version"
    echo "Deploy commit messages: $commitMessage"
    echo "Asset prefix url: $githubPagesUrl"
    echo

    confirmYesNo "Do you want to deploy the last commit?"
    if (( ! $? )); then
        echo
        echo "-------- Deploying --------"
        echo

        # [[ -e $DIST_DIR ]] && rm -rf $DIST_DIR
        # [[ -e .next ]] && rm -rf .next

        ASSET_PREFIX=$githubPagesUrl next build || exit 1

        touch $DIST_DIR/.nojekyll
        git add -f $DIST_DIR/
        git commit -m "$commitMessage"
        git subtree push --prefix $DIST_DIR $REMOTE_NAME $BRANCH_NAME
    fi
}

main "$@"
