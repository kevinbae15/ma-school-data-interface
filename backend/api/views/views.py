from rest_framework import generics
from rest_framework import status
from api.serializers import *
from api.models import *
from django.db import transaction
import json
from rest_framework.views import Response
import math
import logging

logger = logging.getLogger("ten.server")

class schools(generics.ListCreateAPIView):
    def __init__(self):
        self.minSchoolData = []
        schoolId = 1
        dataFile = open('../ma_schools.json', 'r')
        data = json.load(dataFile)

        for school in data:
            school['UNITID'] = schoolId
            self.minSchoolData.append({
                "UNITID": school['UNITID'],
                "INSTNM": school['INSTNM'],
                "ADM_RATE": school['ADM_RATE'],
                "SAT_AVG": school['SAT_AVG'],
            })

            schoolId += 1

        self.schoolsData = data


    def getParameters(self, request):
        parametersObject = request.query_params        

        return parametersObject


    def get(self, request, *arg, **kwargs):   
        parametersObject = self.getParameters(request)
        data = self.minSchoolData
        numberOfPages = None

        try:
            if 'keyword' in parametersObject:
                data = self.search(data, parametersObject['keyword'])
        except Exception as e:
            return Response({"status": "error", "errorMessage": "Something went wrong"}, status=500)

        try:
            if 'sort' in parametersObject:
                if 'sortType' not in parametersObject:
                    data = self.sortSchoolDataByKey(data, parametersObject['sort'], "desc")
                else:
                    data = self.sortSchoolDataByKey(data, parametersObject['sort'], parametersObject['sortType'])

            if 'page' in parametersObject and 'count' in parametersObject:
                data, numberOfPages = self.returnSetOfSchools(data, int(parametersObject['page']), int(parametersObject['count']))


        except ValueError as e:
            return Response({"status": "fail", "errorMessage": str(e)}, status=400)
        except Exception as e:
            return Response({"status": "error", "errorMessage": "Something went wrong"}, status=500)



        return Response({"status": "success", "data": {"schools": data, "numberOfPages": numberOfPages}}, status=200)

    def returnSetOfSchools(self, schoolsData, page, count):
        startCount = count * (page - 1)
        endCount = count * page

        if len(schoolsData) < startCount:
            raise ValueError("invalid page")

        if len(schoolsData) < endCount + 1:
            endCount = len(schoolsData)

        numberOfPages = len(schoolsData) / count

        return schoolsData[startCount:endCount], math.ceil(numberOfPages)



    def sortSchoolDataByKey(self, schoolData, keyword, sortType="desc"):
        if len(schoolData) == 0:
            return []

        if keyword not in schoolData[0]:
            raise ValueError("invalid sort by keyword")

        reverse = False
        if sortType == "asc":
            reverse = True

        if keyword == "ADM_RATE":
            return sorted(schoolData, key = lambda x: float('inf') if x[keyword] == "NULL" else float(x[keyword]), reverse = reverse)
        elif keyword == "SAT_AVG":
            return sorted(schoolData, key = lambda x: float('-inf') if x[keyword] == "NULL" else float(x[keyword]), reverse = not reverse)
        else:
            return sorted(schoolData, key = lambda x: x[keyword], reverse = reverse)

    def search(self, schoolData, keyword):
        filteredResults = []

        for school in schoolData:
            if keyword in school['INSTNM'].lower():
                filteredResults.append(school)

        return filteredResults


class singleSchool(schools):
    def get(self, request, *arg, **kwargs):   
        school_id = kwargs["school_id"]

        if not school_id:
            return Response({"status": "fail", "errorMessage": "Invalid school id"}, status=400)

        for school in self.schoolsData:
            if school['UNITID'] == school_id:
                return Response({"status": "success", "data": school}, status=200)


        return Response({"status": "fail", "errorMessage": "School not found"}, status=400)
