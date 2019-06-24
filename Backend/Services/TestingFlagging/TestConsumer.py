from kafka import KafkaConsumer
from json import loads
class TestConusmer():
    def __init__(self, boostrapServers=['kafka:29092'], groupId='test001'):
        self.consumer = KafkaConsumer(bootstrap_servers=boostrapServers, group_id = groupId, enable_auto_commit=True, value_deserializer=lambda x: loads(x.decode('utf-8')))
    def receive(self):
        while (True):
            msg = next(self.consumer)
            print ("now we do something with the message: %s", msg)
            # determine what column needs to be ran
            # go to redis based on column number and uid in redis, and test type
            # run test with x test type on column data