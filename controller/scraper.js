// Import all dependencies
const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");
var db = require("../models");

// Create an NYTScraper object
var NYTScraper = {
  // Function that scrapes the NYT site for article data
  scraperFunc: function (res) {
    // Call on Axios and pass through NYT url
    // Then run an anon func that creates the data object for each article result scraped
    return axios.get("http://www.nytimes.com").then(function (response) {
      // Initiate cheerio for that response data from axios
      var $ = cheerio.load(response.data);

      console.log("Scrape of NYT site in progress...");

      // Create an an empty array to hold all our article objects
      var articlesArr = [];

      // Hook onto the HTML element on the NYT page that has a class of ".assetWrapper"
      // For each article in the response data, create a data article object
      $(".assetWrapper").each(function (i, element) {
        // In each article, grab its headline, URL, and summary and store it in a variable
        // Use this to refer to the div with class ".assetWrapper"

        // Headline
        // Contained within "h2" tag
        var headline = $(this).find("h2").text().trim();

        // URL
        // Contained within href attribute of the "a" tag
        var url = $(this).find("a").attr("href");

        // Summary
        // Contained within "p" tag
        var summary = $(this).find("p").text().trim();

        // Check to make sure that headline, url, and summary of a scraped article exists

        if (headline && url && summary) {
          // Then use regex to clean up the text in the headline and summary
          // Remove extra lines, extra spacing, extra tabs
          var headlineClean = headline
            .replace(/(\r\n|\n|\r|\t|\s+)/gm, " ")
            .trim();

          var summaryClean = summary
            .replace(/(\r\n|\n|\r|\t|\s+)/gm, " ")
            .trim();

          // Create an article data object using headline, url, and summary that we will use to push to the articlesArr created earlier
          var newArticle = {
            headline: headlineClean,
            url: "https://www.nytimes.com" + url,
            summary: summaryClean,
          };

          // Push that newArticle to articlesArr
          articlesArr.push(newArticle);
        }
      });

      // When all articles have been scraped and individual pushed to articlesArr, return the articlesArr
      return articlesArr;
    });
  },

  // Function that runs NYTScraper and inserts all scraped NYT article data into mongoDB
  runScraperFunc: function (req, res) {
    // Run the NYTScraper function
    // Then run an anon function that takes in articles as a param
    return (
      NYTScraper()
        .then(function (articles) {
          // Using the Articles Model, create new articles from the articles param being passed
          return db.Article.create(articles);
        })
        // Then run another anon function that takes in dbArticle as a param
        .then(function (dbArticle) {
          // If there are no new articles return appropriate message
          if (dbArticle.length === 0) {
            res.json({
              message: "No new articles today. Check back soon!",
            });
          }
          // Else, return message saying how many new articles there are
          else {
            res.json({
              message: dbArticle.length + " new articles added!",
            });
          }
        })
        // Catch any errors
        .catch(function (err) {
          // This query won't insert articles with duplicate headlines, but it will error after inserting the others
          res.json({
            message: "Scrape complete!!",
          });
        })
    );
  },

  // Function that retrieves all the articles and associated notes from the db
  retrieveAllDBArticlesFunc: function (req, res) {
    // Access the db, sort all headlines by date and send them to the user
    db.Article.find(req.query)
      .sort({ date: -1 })
      .then(function (dbArticle) {
        res.json(dbArticle);
      });
  },

  // Function that creates a new note and updates the associated article
  createNewNoteFunc: function () {},

  // Function for deleting a note from an article
  deleteNoteFunc: function () {},

  // Function to get only the favorited articles with associated notes
  retrieveDBFavoriteArticlesFunc: function () {},

  // Function to update the favorited value for an article
  updateArticleAsFavoriteFunc: function () {},
};
