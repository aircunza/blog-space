import { beforeEach, describe, expect, test } from "@jest/globals";

import { PostId } from "../../../../src/contexts/Posts/Posts/domain/value-object/PostId";
import { PostsCounterIncrementer } from "../../../../src/contexts/Posts/PostsCounter/application/increment/PostsCounterIncrementer";
import { PostsCounter } from "../../../../src/contexts/Posts/PostsCounter/domain/PostsCounter";
import { PostsCounterRepository } from "../../../../src/contexts/Posts/PostsCounter/domain/PostsCounterRepository";

describe("PostsCounterIncrementer", () => {
  let repository: jest.Mocked<PostsCounterRepository>;
  let incrementer: PostsCounterIncrementer;

  // Before each test, we set up the repository mock and the incrementer
  beforeEach(() => {
    repository = {
      // Mock the search method to return a resolved promise with null value, simulating no previous counter
      search: jest.fn().mockResolvedValue(null),
      // Mock the save method to track calls without performing any real saving logic
      save: jest.fn(),
    };
    incrementer = new PostsCounterIncrementer(repository); // Instantiate the incrementer with the mocked repository
  });

  // Test case to ensure the counter is incremented when no previous count exists
  test("should increment the counter when postId has not been counted", async () => {
    const postId = new PostId("f47ac10b-58cc-4372-a567-0e02b2c3d479"); // Create a new PostId instance

    // Simulate that no counter exists yet (first-time encounter)
    repository.search.mockResolvedValue(null);

    // Perform the increment operation
    await incrementer.increment(postId);

    // Assert that the search method was called once to check for an existing counter
    expect(repository.search).toHaveBeenCalled();
    // Assert that the save method was called to save the new counter
    expect(repository.save).toHaveBeenCalled();

    // Retrieve the counter that was saved and check its values
    const savedCounter = repository.save.mock.calls[0][0];
    // Log the total count to verify the increment
    console.log("Saved counter total:", savedCounter.getTotal());

    expect(savedCounter.getTotal()).toBe(1); // Check if the counter was incremented
    expect(savedCounter.hasIncremented(postId)).toBe(true); // Ensure the counter includes the incremented postId
  });

  // Test case to ensure the counter is not incremented if the postId was already counted
  test("should not increment the counter if postId was already counted", async () => {
    const postId = new PostId("f47ac10b-58cc-4372-a567-0e02b2c3d479"); // Create a new PostId instance

    // Create an existing counter that already has the postId incremented
    const existingCounter = PostsCounter.initialize();
    existingCounter.increment(postId); // The postId has already been counted

    // Simulate that an existing counter was found for the postId
    repository.search.mockResolvedValue(existingCounter);

    // Perform the increment operation again
    await incrementer.increment(postId);

    // Assert that the search method was called to check for an existing counter
    expect(repository.search).toHaveBeenCalled();
    // Assert that the save method was not called because the counter should not be incremented
    expect(repository.save).not.toHaveBeenCalled(); // No save should happen because the postId was already counted
  });

  // Test case to ensure the counter is incremented if a different postId is provided
  test("should increment the counter when a different postId is provided", async () => {
    const postId1 = new PostId("f47ac10b-58cc-4372-a567-0e02b2c3d479"); // First postId
    const postId2 = new PostId("f47ac10b-58cc-4372-a567-0e02b2c3d480"); // Second postId

    // Initialize a counter with the first post already counted
    const existingCounter = PostsCounter.initialize();
    existingCounter.increment(postId1); // First post counted

    // Simulate the repository returning this existing counter
    repository.search.mockResolvedValue(existingCounter);

    // Perform the increment operation with a different postId
    await incrementer.increment(postId2);

    // Assert that the repository search method was called
    expect(repository.search).toHaveBeenCalled();
    // Assert that the save method was called, since postId2 wasn't counted yet
    expect(repository.save).toHaveBeenCalled();

    // Retrieve and inspect the updated counter
    const savedCounter = repository.save.mock.calls[0][0];
    // Log the new total to ensure both posts are counted
    console.log(
      "Saved counter total after second post:",
      savedCounter.getTotal()
    );

    expect(savedCounter.getTotal()).toBe(2); // The total should now be 2
    expect(savedCounter.hasIncremented(postId1)).toBe(true); // Should include the first postId
    expect(savedCounter.hasIncremented(postId2)).toBe(true); // Should include the second postId
  });
});
